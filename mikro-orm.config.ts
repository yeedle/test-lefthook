import { FlushMode, MikroORMOptions } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { CommittedOffset } from '@trialspark/pigeon.ts';

const isProduction = process.env.NODE_ENV === 'production';

const options: Partial<MikroORMOptions> = {
  entities: [
    './dist/src/**/*.entity.js',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    CommittedOffset!,
  ],
  entitiesTs: isProduction
    ? undefined
    : [
        './src/**/*.entity.ts',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        CommittedOffset!,
      ],
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
  flushMode: FlushMode.COMMIT,
  strict: true,
  cache: {
    options: {
      cacheDir: process.cwd() + '/.mikro_orm_cache',
    },
  },

  // Allows us to execute queries on the top-level entity manager, which is fine for tests since
  // we won't be dealing with concurrent tests within a file.
  allowGlobalContext: process.env.NODE_ENV === 'test',
  debug: !!process.env.DEBUG,

  // This setting is for calling mikro-orm directly.
  // When instantiated by nestjs, we don't have access to the postgres urls yet
  // so we rely on nestjs overriding.
  clientUrl:
    process.env.NODE_ENV === 'test'
      ? process.env.POSTGRESQL_URL_TEST
      : process.env.POSTGRESQL_URL || 'postgres://nothing/nothing',
};

export default options;
