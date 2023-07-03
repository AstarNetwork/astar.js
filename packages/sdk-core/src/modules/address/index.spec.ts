import { ASTAR_SS58_FORMAT } from '@astar-network/astar-sdk-core/modules/config';
import { describe, expect, it } from '@jest/globals';
import { isValidAddressPolkadotAddress, checkSumEvmAddress, isValidEvmAddress, buildEvmAddress } from './index';

describe('Test functions defined in the address module', () => {
  it('returns results of the substrate address verification', () => {
    expect(isValidAddressPolkadotAddress('axodJWpkSi9E5k7SgewYCCnTMZw3y6n79nuLevTCGFt7ADw')).toStrictEqual(true);
    expect(
      isValidAddressPolkadotAddress('axodJWpkSi9E5k7SgewYCCnTMZw3y6n79nuLevTCGFt7ADw', ASTAR_SS58_FORMAT)
    ).toStrictEqual(true);
    expect(isValidAddressPolkadotAddress('axodJWpkSi9E5k7SgewYCCnTMZw3y6n79nuLevTCGFt7ADw', 1)).toStrictEqual(false);
    expect(isValidAddressPolkadotAddress('axodJWpkSi9E5k7SgewYCCnTMZw3y6n79nuLevTCGFt7ADw', 0)).toStrictEqual(false);
  });
  it('returns results of the EVM address verification', () => {
    expect(checkSumEvmAddress('0x91986602d9c0d8A4f5BFB5F39a7Aa2cD73Db73B7')).toStrictEqual(
      '0x91986602d9c0d8A4f5BFB5F39a7Aa2cD73Db73B7'
    );
    expect(isValidEvmAddress('0x91986602d9c0d8A4f5BFB5F39a7Aa2cD73Db73B7')).toStrictEqual(true);
  });
  it('returns mapped EVM address', () => {
    expect(buildEvmAddress('axodJWpkSi9E5k7SgewYCCnTMZw3y6n79nuLevTCGFt7ADw')).toStrictEqual(
      '0xde53286f1d6c299fb712a3b48239e714ca117b69'
    );
  });
});
