import { describe, expect, it } from '@jest/globals';
import { formatTip } from './index';

describe('Test Gas-Api utils', () => {
  it('converts the native tip amount from wei', () => {
    // Memo: toBe -> unit: ASTR(same as ETH)
    expect(formatTip('10000000000000')).toStrictEqual('0.00001');
  });
});
