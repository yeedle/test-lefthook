import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'app.config';

import { AppConfigService } from 'src/config/config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
