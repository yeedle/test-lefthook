import { Injectable } from '@nestjs/common';
import { LoggerService as CanonicalLoggerService } from '@trialspark/toolbox';
import { Span, TraceService } from 'nestjs-ddtrace';

import { Engineer } from 'src/engineers/entities/engineer.entity';
import { EngineerRepository } from 'src/engineers/entities/engineer.repository';

@Injectable()
export class EngineerService {
  constructor(
    private engineerRepository: EngineerRepository,
    private canonicalLoggerService: CanonicalLoggerService,
    private traceService: TraceService,
  ) {}

  @Span()
  async create(firstName: string, lastName: string): Promise<Engineer> {
    const newEngineer = new Engineer({ firstName, lastName });
    await this.engineerRepository.persistAndFlush(newEngineer);
    this.canonicalLoggerService.add('newEngineer.id', newEngineer.id);
    this.traceService.getActiveSpan()?.setTag('engineer.id', newEngineer.id);

    return newEngineer;
  }

  async findOneById(id: number): Promise<Engineer | null> {
    return await this.engineerRepository.findOne(id);
  }
}
