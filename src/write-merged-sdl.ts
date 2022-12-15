import { printSubgraphSchema } from '@apollo/subgraph';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from 'src/app.module';

void (async () => {
  // just need a dummy value so that mikro-orm doesn't block startup.
  // we won't actually be connecting to the database as part of this.
  process.env.POSTGRESQL_URL = 'postgres://nothing/nothing';
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false },
  );
  await app.init();
  process.stdout.write(printSubgraphSchema(app.get(GraphQLSchemaHost).schema));
  await app.close();
})();
