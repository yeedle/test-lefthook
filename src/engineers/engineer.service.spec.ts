import { MockProxy, mock } from 'jest-mock-extended';
import { createTestingModule } from 'test/test-utils';

import { EngineerService } from 'src/engineers/engineer.service';
import { Engineer } from 'src/engineers/entities/engineer.entity';
import { EngineerRepository } from 'src/engineers/entities/engineer.repository';

describe('EngineerService', () => {
  let engineerService: EngineerService;
  let mockEngineerRepo: MockProxy<EngineerRepository>;

  beforeEach(async () => {
    mockEngineerRepo = mock<EngineerRepository>();

    const module = await createTestingModule({
      controllers: [EngineerService],
      providers: [{ provide: EngineerRepository, useValue: mockEngineerRepo }],
    })
      .useMocker(() => mock(undefined, {}))
      .compile();

    engineerService = module.get(EngineerService);
  });

  it('exists', () => {
    expect(engineerService).toEqual(expect.any(EngineerService));
  });

  describe('findOneById()', () => {
    it('returns an engineer given an id', async () => {
      const engineer = new Engineer({ firstName: 'Test', lastName: 'Eng' });
      mockEngineerRepo.findOne
        .calledWith(engineer.id)
        .mockResolvedValue(engineer);

      expect(await engineerService.findOneById(engineer.id)).toBe(engineer);
    });
  });

  describe('create()', () => {
    it('returns a new engineer with the given name', async () => {
      const firstName = 'First';
      const lastName = 'Last';

      const createdEngineer = await engineerService.create(firstName, lastName);

      expect(createdEngineer.firstName).toBe(firstName);
      expect(createdEngineer.lastName).toBe(lastName);
    });

    it('persists a new engineer', async () => {
      const firstName = 'First';
      const lastName = 'Last';
      const expectedInput = new Engineer({ firstName, lastName });

      await engineerService.create(firstName, lastName);

      expect(mockEngineerRepo.persistAndFlush).toHaveBeenCalledWith(
        expectedInput,
      );
    });
  });
});
