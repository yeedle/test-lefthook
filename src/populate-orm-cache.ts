import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from 'src/app.module';

async function populateCache() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  await app.close();
}
void populateCache();
