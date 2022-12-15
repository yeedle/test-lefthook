import { ModuleMetadata } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  createTestingModule as createBaseModule,
  initNestApp as initNestApplication,
} from '@trialspark/toolbox';
import mikroORMConfig from 'mikro-orm.config';

import { AppModule } from 'src/app.module';

const testMikroOrmConfig = {
  ...mikroORMConfig,
  clientUrl: process.env.POSTGRESQL_URL_TEST,
};

/**
 * Initializes the app for E2E testing, including ensuring there is a single database transaction
 * for each test, and that it is rolled back at the end of each test.
 */
export const initNestApp = async (): Promise<NestFastifyApplication> => {
  return await initNestApplication({ module: AppModule }, testMikroOrmConfig);
};

export const createTestingModule = (metadata: ModuleMetadata) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  createBaseModule(metadata, testMikroOrmConfig);
