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

export const fetchNativeBalance = async ({ api, address }: { api: ApiPromise; address: string }) => {
  try {
    const accountInfo = await api.query.system.account<SystemAccount>(address);
    const balance = accountInfo.data.free;
    return balance.toString();
  } catch (error) {
    console.error(error);
    return '0';
  }
};
