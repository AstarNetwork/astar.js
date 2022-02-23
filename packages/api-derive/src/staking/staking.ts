import { ApiInterfaceRx } from '@polkadot/api/types';
import { DeriveCustom } from '@polkadot/api-derive';
import { PalletDappsStakingEraStakingPoints as EraStakingPoints } from '@astar-network/astar-types/interfaces';
import { Observable } from 'rxjs';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';
import { memo } from '@polkadot/api-derive/util';

export const derive: DeriveCustom = {};
export const getAddressEnum = (address: string) => ({ Evm: address });

export function stakers(instanceId: string, api: ApiInterfaceRx): () => Observable<PalletDappsStakingEraStakingPoints> {
  return memo(
    instanceId,
    (): Observable<PalletDappsStakingEraStakingPoints> =>
      api.query.dappsStaking.contractEraStake.entries<EraStakingPoints>(
        getAddressEnum('0x072416b9df2382a62Df34956DffB7B0aDdf668F9') 
      ) as any
  );
}
