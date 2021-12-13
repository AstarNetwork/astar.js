// tslint:disable-next-line no-implicit-dependencies
import { assert } from 'chai';

// import { evmConverter } from '@astar/sdk-core';
import { evmConverter } from '../../sdk-core/src/converter';

import { useEnvironment } from './helpers';

describe('evmConverter test', function () {
  describe('Unit tests for the EVM converter', function () {
    useEnvironment('hardhat-project');

    const ethAddress = '0x1111111111111111111111111111111111111111';
    const astarAddress = evmConverter(ethAddress);

    it('the address is a string', function () {
      assert.isString(astarAddress);
    });

    it('the address starts with i', function () {
      assert.isTrue(astarAddress.startsWith('i'));
    });
  });
});
