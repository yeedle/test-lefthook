import { PigeonCliOptions } from '@trialspark/pigeon.cli';

const isInAws = Boolean(process.env.AWS_ACCOUNT);

const options: PigeonCliOptions = {
  service: 'foobar',
  environment: process.env.AWS_ACCOUNT ?? 'local',
  bindingsDirectory: './src/pigeon-bindings',
  definitions: './src/pigeon-definitions/**/*.ts',
  clientModuleLocation: './src/pigeon.ts',
  migrationsDirectory: './pigeon-migrations',
  schemaRegistry: {
    name: 'spark',
    assumeRole: process.env.SERVICE_MIGRATION_RUNNER_GLUE_ACCESS_ARN,
    endpoint: isInAws ? undefined : 'http://localhost:4566',
  },
  foreignSchemaRegistries: {
    aws: {
      name: 'spark',
    },
  },
};

export default options;
