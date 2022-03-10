import type { DeriveCustom } from '@polkadot/api-base/types';

export const derive: DeriveCustom = {
  dappStaking: staking as unknown as DeriveCustom[string]
};
