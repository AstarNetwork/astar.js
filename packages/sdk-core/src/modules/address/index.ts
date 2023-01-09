import { hexToU8a, isHex, stringToU8a, u8aConcat } from '@polkadot/util';
import { decodeAddress, encodeAddress, checkAddress } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto/blake2';
import Keyring, { createPair } from '@polkadot/keyring';

export const isValidAddressPolkadotAddress = (address: string, prefix?: number): boolean => {
  try {
    if (prefix) {
      return checkAddress(address, prefix)[0];
    } else {
      encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
      return true;
    }
  } catch (error) {
    return false;
  }
};

export function evmConverter(evmAddress = ''): string {
  try {
    const addr = hexToU8a(evmAddress);
    const data = stringToU8a('evm:');
    const res = blake2AsU8a(u8aConcat(data, addr));

    const mainnetKeyring = new Keyring({ type: 'sr25519', ss58Format: 7 });
    const mainnetPair = createPair({ toSS58: mainnetKeyring.encodeAddress, type: 'sr25519' }, { publicKey: res });

    const convertedMainnetAddress = mainnetPair.address;
    return convertedMainnetAddress;
  } catch (err) {
    return 'error';
  }
}
