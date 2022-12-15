import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { EngineerService } from 'src/engineers/engineer.service';
import { Engineer } from 'src/engineers/entities/engineer.entity';
import { CreateEngineerInput } from 'src/graphql';

@Resolver('Engineer')
export class EngineerResolver {
  constructor(private readonly engineersService: EngineerService) {}

  @Query('engineer')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Engineer | null> {
    return await this.engineersService.findOneById(id);
  }

  @ResolveField()
  id(@Parent() engineer: Engineer) {
    return engineer.id.toString();
  }

  @Mutation('createEngineer')
  async createEngineer(
    @Args('input') input: CreateEngineerInput,
  ): Promise<Engineer> {
    return this.engineersService.create(input.firstName, input.lastName);
  }
}
