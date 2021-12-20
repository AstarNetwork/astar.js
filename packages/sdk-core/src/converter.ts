import { hexToU8a, stringToU8a, u8aConcat } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto/blake2';
import Keyring, { createPair } from '@polkadot/keyring';

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
