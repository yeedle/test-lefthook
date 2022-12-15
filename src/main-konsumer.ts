import * as winston from 'winston';
import { NestFactory } from '@nestjs/core';
import { Pigeon } from '@trialspark/pigeon.ts';
import { WinstonModule } from 'nest-winston';

import { AppModule } from 'src/app.module';

void (async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    }),
  });

  await app.init();
  await app.get(Pigeon).subscribe({ events: true, commands: true });
})();
