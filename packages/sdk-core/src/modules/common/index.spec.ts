import { describe, expect, it } from '@jest/globals';
import { truncate, objToArray, capitalize } from './index';

describe('Test functions defined in the common module', () => {
  it('truncates numbers', () => {
    expect(truncate(3.5636232, 2)).toStrictEqual(3.56);
    expect(truncate(3.5636232, 3)).toStrictEqual(3.563);
    expect(truncate(0.9899, 3)).toStrictEqual(0.989);
    expect(truncate(0.9899)).toStrictEqual(0.989);
    expect(truncate('0.9899')).toStrictEqual(0.989);
    expect(truncate('0.12')).toStrictEqual(0.12);
    expect(truncate('0.001')).toStrictEqual(0.001);
    expect(truncate('0.00001')).toStrictEqual(0);
  });
  it('casts object to array', () => {
    expect(objToArray({ a: '1', b: '2', c: '3' })).toStrictEqual(['1', '2', '3']);
  });
  it('returns capitalized string', () => {
    expect(capitalize('apple')).toStrictEqual('Apple');
  });
});
