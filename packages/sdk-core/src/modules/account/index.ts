import { ApiPromise } from '@polkadot/api';
import { Struct } from '@polkadot/types';
import { BN } from '@polkadot/util';

interface SystemAccount extends Struct {
  data: {
    free: BN;
    reserved: BN;
    miscFrozen: BN;
    feeFrozen: BN;
  };
}

export const fetchNativeBalance = async ({ api, address }: { api: ApiPromise; address: string }): Promise<string> => {
  try {
    const accountInfo = await api.query.system.account<SystemAccount>(address);
    const balance = accountInfo.data.free;
    return balance.toString();
  } catch (error) {
    console.error(error);
    return '0';
  }
};

export const getVested = ({ currentBlock,
  startBlock,
  perBlock,
  locked }: {
  currentBlock: BN;
  startBlock: BN;
  perBlock: BN;
  locked: BN;
}): BN => {
  if (currentBlock.lt(startBlock)) {
    return new BN(0);
  }

  const blockHasPast = currentBlock.sub(startBlock);
  const vested = BN.min(locked, blockHasPast.mul(perBlock));
  return vested;
};
