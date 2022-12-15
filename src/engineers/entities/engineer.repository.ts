import { EntityRepository } from '@mikro-orm/postgresql';

import { Engineer } from 'src/engineers/entities/engineer.entity';

export class EngineerRepository extends EntityRepository<Engineer> {}
