import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/core';
import { Pigeon, getBootstrapBrokersFromSrv } from '@trialspark/pigeon.ts';
import cliConfig from 'pigeon-cli.config';

const KAFKA_IAM_BOOTSTRAP_SRV = process.env.KAFKA_IAM_BOOTSTRAP_SRV;

let emPromise: Promise<EntityManager> | undefined;

const getEm = async () => {
  emPromise ??= (async () => {
    const orm = await MikroORM.init();

    return orm.em.fork();
  })();

  return emPromise;
};

export default new Pigeon({
  ...cliConfig,
  schemaRegistry: {
    ...cliConfig.schemaRegistry,
    assumeRole: process.env.SERVICE_KONSUMER_MSK_ACCESS_ARN,
  },
  kafka: {
    brokers: KAFKA_IAM_BOOTSTRAP_SRV
      ? async () => getBootstrapBrokersFromSrv(KAFKA_IAM_BOOTSTRAP_SRV)
      : ['0.0.0.0:9092'],
    auth: process.env.SERVICE_KONSUMER_MSK_ACCESS_ARN
      ? {
          type: 'aws_iam',
          region: process.env.AWS_REGION ?? 'us-east-1',
          assumeRole: process.env.SERVICE_KONSUMER_MSK_ACCESS_ARN,
        }
      : undefined,
  },
  offsetCommitterOptions: { getEntityManager: () => getEm() },
  unitOfWorkManagerOptions: { getEntityManager: () => getEm() },
});
