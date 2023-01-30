import { describe, expect, it } from '@jest/globals';
import { nFormatter, defaultAmountWithDecimals } from './index';

describe('Test functions defined in the units module', () => {
  it('returns formatted number', () => {
    expect(nFormatter(1000)).toStrictEqual('1K');
    expect(nFormatter(1000000)).toStrictEqual('1M');
  });
  it('returns formatted value', () => {
    expect(defaultAmountWithDecimals('12999999999999000000', 18)).toStrictEqual('12.999999999999');
  });
});
