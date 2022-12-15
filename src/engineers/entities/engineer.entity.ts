import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

import { EngineerRepository } from 'src/engineers/entities/engineer.repository';

@Entity({ customRepository: () => EngineerRepository })
export class Engineer {
  [EntityRepositoryType]?: EngineerRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  constructor({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
