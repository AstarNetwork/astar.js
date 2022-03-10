import { ApiInterfaceRx } from '@polkadot/api/types';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';
import { Observable, map } from 'rxjs';
import { memo } from '@polkadot/api-derive/util';
import { Option } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';

export const getAddressEnum = (address: string) => ({ Evm: address });

export function stakers(instanceId: string, api: ApiInterfaceRx): () => Observable<AccountId[]> {
  return memo(
    instanceId,
    (): Observable<AccountId[]> =>
      api.query.dappsStaking.contractEraStake
        .entries<Option<PalletDappsStakingEraStakingPoints>>(
        getAddressEnum('0x072416b9df2382a62Df34956DffB7B0aDdf668F9')
      )
        .pipe(
          map((res) => {
            const stakers: AccountId[] = [];
            for (const eraInfo of res) {
              const eraStakers = Array.from(eraInfo[1].unwrap().stakers.keys());
              for (const staker of eraStakers) {
                if (!stakers.includes(staker)) stakers.push(staker);
              }
            }
            return stakers;
          })
        )
  );
}
