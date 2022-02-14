import { DeriveCustom } from '@polkadot/api-derive';
import * as staking from './staking';

export const derive: DeriveCustom = {
  dappStaking: staking as unknown as DeriveCustom[string]
};
