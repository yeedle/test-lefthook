const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...baseConfig,
  collectCoverageFrom: ['**/*.e2e-spec.(t|j)s'],
  roots: ['<rootDir>/test'],
  testRegex: '.e2e-spec.ts$',
  setupFiles: ['<rootDir>/src/tracing.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupJestE2e.ts'],
};
