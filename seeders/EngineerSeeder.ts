import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { EngineerFactory } from '../src/engineers/entities/engineer.factory';

export class EngineerSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const engineers = await new EngineerFactory(em).create(5);

    console.log(`Created engineers with ids: ${engineers.map((e) => e.id)}.`);
  }
}
