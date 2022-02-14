import { ApiInterfaceRx } from '@polkadot/api/types';
import { DeriveCustom } from '@polkadot/api-derive';
import { Observable } from 'rxjs';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';
import { memo } from '@polkadot/api-derive/util';

export const derive: DeriveCustom = {};

export function stakers(instanceId: string, api: ApiInterfaceRx): () => Observable<PalletDappsStakingEraStakingPoints> {
  return memo(instanceId, () => {
    console.log("hi from staking")
    return null as unknown as PalletDappsStakingEraStakingPoints;
  });
}

export function stakers2(instanceId: string, api: ApiInterfaceRx): () => Observable<PalletDappsStakingEraStakingPoints> {
  return memo(instanceId, () => {
    console.log("hi from staking")
    return null as unknown as PalletDappsStakingEraStakingPoints;
  });
}
