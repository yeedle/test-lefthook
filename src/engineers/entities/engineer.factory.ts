import { Factory, Faker } from '@mikro-orm/seeder';

import { Engineer } from 'src/engineers/entities/engineer.entity';

export class EngineerFactory extends Factory<Engineer> {
  model = Engineer;

  protected definition(faker: Faker): Partial<Engineer> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
  }
}
