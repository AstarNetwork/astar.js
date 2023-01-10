import { ApiPromise } from '@polkadot/api';
import { isValidAddressPolkadotAddress } from '@astar-network/astar-sdk-core';
import { isEthereumAddress } from '@polkadot/util-crypto';

export const getDappStakers = async ({ api }: { api: ApiPromise }): Promise<number> => {
  try {
    // Memo: It takes a while to return the promise (10 ~ 15 secs).
    const result = await api.query.dappsStaking.ledger.entries();
    const numStakers = result.length;
    return numStakers;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getDappAddressEnum = (address: string) => {
  if (isEthereumAddress(address)) {
    return { Evm: address };
  } else if (isValidAddressPolkadotAddress(address)) {
    return { Wasm: address };
  } else {
    throw new Error(`Invalid contract address ${address}. The address should be in EVM or WASM format.`);
  }
};
