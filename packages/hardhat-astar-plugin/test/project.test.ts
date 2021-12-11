import { assert } from 'chai';

import { useEnvironment } from './helpers';

describe('Hello CI', function () {
  describe('Hardhat Runtime Environment extension', function () {
    useEnvironment('hardhat-project');

    it('this hello should fix failing tests', function () {
      const he = 'hello';
      assert.equal(he, 'hello');
    });
  });
});
