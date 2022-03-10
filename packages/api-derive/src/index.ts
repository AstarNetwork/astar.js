import type { DeriveCustom } from '@polkadot/api-base/types';
import * as dappsStaking from './dappsStaking';

export const derive: DeriveCustom = {
  dappStaking: dappsStaking as unknown as DeriveCustom[string]
};
