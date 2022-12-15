import { EntityManager } from '@mikro-orm/postgresql';
import { INestApplication } from '@nestjs/common';
import { executeGraphqlRequest } from '@trialspark/toolbox';
import { initNestApp } from 'test/test-utils';

import { EngineerFactory } from 'src/engineers/entities/engineer.factory';

describe('Engineer Module (E2E)', () => {
  let app: INestApplication;
  let em: EntityManager;

  beforeEach(async () => {
    app = await initNestApp();
    em = app.get(EntityManager);
  });

  describe('createEngineer mutation', () => {
    it('creates an engineer', async () => {
      const firstName = 'First';
      const lastName = 'Last';

      const response = await executeGraphqlRequest(app, {
        queryString: `mutation CreateEngineer($input: CreateEngineerInput!) {
          createEngineer(input: $input) {
            id
            firstName
            lastName
          }
        }
        `,
        queryVariables: {
          input: { firstName, lastName },
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.createEngineer.id).toBeDefined();
      expect(response.body.data.createEngineer.firstName).toBe(firstName);
      expect(response.body.data.createEngineer.lastName).toBe(lastName);
    });
  });

  describe('engineer query', () => {
    it('returns an engineer queried by id', async () => {
      const existingEngineer = await new EngineerFactory(em).createOne();

      const response = await executeGraphqlRequest(app, {
        queryString: `{
            engineer(id: ${existingEngineer.id}) {
              id
              firstName
              lastName
            }
          }
          `,
      });
      expect(response.body.data.engineer.id).toBe(
        existingEngineer.id.toString(),
      );
      expect(response.body.data.engineer.firstName).toBe(
        existingEngineer.firstName,
      );
      expect(response.body.data.engineer.lastName).toBe(
        existingEngineer.lastName,
      );
    });
  });
});
