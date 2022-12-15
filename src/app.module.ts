import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriver,
  MercuriusFederationDriverConfig,
} from '@nestjs/mercurius';
import {
  LoggerModule as CanonicalLoggerModule,
  HealthModule,
} from '@trialspark/toolbox';
import { PigeonNest } from '@trialspark/toolbox/dist/pigeon-nest';
import mikroOrmOptions from 'mikro-orm.config';
import { DatadogTraceModule } from 'nestjs-ddtrace';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';
import { EngineersModule } from 'src/engineers/engineers.module';
import pigeon from 'src/pigeon';

const domainModules = [EngineersModule];
const configModules = [AppConfigModule, CanonicalLoggerModule, HealthModule];
const libraryModules = [
  MikroOrmModule.forRootAsync({
    useFactory: (configService: AppConfigService) => ({
      ...mikroOrmOptions,

      // By default, each HTTP request gets its own DB transaction. This is _very good_ in the real
      // world, but in E2E tests, it'd mean the requests we make would be executed in a different
      // transaction then the one where data was inserted into the DB by the tests. The result
      // would be that the queries made by the HTTP request can't "see" the data created by the tests
      // (because we're creating and reading in different transactions.)
      //
      // So for tests, we run everything in a single test (e.g. an `it()` block) in the same transaction,
      // including for HTTP requests that are made in a test.
      registerRequestContext: configService.env !== 'test',
    }),
    inject: [AppConfigService],
  }),
  EventEmitterModule.forRoot({
    wildcard: true, // enable listening to wildcard events
  }),
  GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
    driver: MercuriusFederationDriver,
    graphiql: true,
    typePaths: ['./**/*.graphql'],
    federationMetadata: true,
  }),
  DatadogTraceModule.forRoot(),
  PigeonNest.forRootAsync({
    pigeon: () => pigeon,
    options: (em: EntityManager) => {
      const pigeonEm = em.fork();

      return {
        unitOfWorkManagerOptions: {
          getEntityManager: () => pigeonEm,
        },
        offsetCommitterOptions: {
          getEntityManager: () => pigeonEm,
        },
      };
    },
    inject: [EntityManager],
  }),
];

@Module({
  imports: [...configModules, ...domainModules, ...libraryModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
