import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }
  get postgresqlUrl(): string | undefined {
    return this.configService.get<string>('POSTGRESQL_URL');
  }

  get sentryDSN(): string | undefined {
    return this.configService.get<string>('SENTRY_DSN');
  }
}
