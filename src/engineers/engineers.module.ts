import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LoggerModule as CanonicalLoggerModule } from '@trialspark/toolbox';

import { EngineerResolver } from 'src/engineers/engineer.resolver';
import { EngineerService } from 'src/engineers/engineer.service';
import { Engineer } from 'src/engineers/entities/engineer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Engineer]), CanonicalLoggerModule],
  providers: [EngineerService, EngineerResolver],
})
export class EngineersModule {}
