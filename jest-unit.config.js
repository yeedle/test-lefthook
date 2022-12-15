const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.e2e-spec.(t|j)s'],
};
