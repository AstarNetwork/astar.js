const config = require('@polkadot/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {
    '@astar-network/astar-api-derive(.*)$': '<rootDir>/packages/api-derive/src/$1',
    '@astar-network/astar-api(.*)$': '<rootDir>/packages/api/src/$1',
    '@astar-network/astar-types(.*)$': '<rootDir>/packages/types/src/$1',
    '@astar-network/astar-type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1',
    '@astar-network/astar-sdk-core(.*)$': '<rootDir>/packages/sdk-core/src/$1'
  },
  testTimeout: 30000
};
