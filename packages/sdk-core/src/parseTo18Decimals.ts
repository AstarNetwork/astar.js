import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import BN from 'bn.js';
import { ethers } from 'ethers';

/**
 * Convert the given value into the 18 decimals amount.
 * @param amount 0.1
 * @returns '100000000000000000' (format: BN)
 */
export const parseTo18Decimals = (amount: number | string): BN => {
  return new BN(ethers.utils.parseEther(String(amount)).toString());
};

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};
