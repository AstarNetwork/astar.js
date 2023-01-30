import { ApiInterfaceRx } from '@polkadot/api/types';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';
import { Observable, map } from 'rxjs';
import { memo } from '@polkadot/api-derive/util';
import { Option } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { ContractAddress } from '../types';

export const getAddressEnum = (address: string) => ({ Evm: address });

/**
 * @deprecated stakers does not return results
 */
export function stakers(
  instanceId: string,
  api: ApiInterfaceRx
): (contractAddress: ContractAddress) => Observable<AccountId[]> {
  return memo(
    instanceId,
    (contractAddress: ContractAddress): Observable<AccountId[]> =>
      api.query.dappsStaking.contractEraStake.entries<Option<PalletDappsStakingEraStakingPoints>>(contractAddress).pipe(
        map((res) => {
          const stakers: AccountId[] = [];
          // TODO this is inefficient. Expect performance to decrease as chain gets longer.
          for (const eraInfo of res) {
            if (eraInfo[1].unwrap().stakers) {
              const eraStakers = Array.from(eraInfo[1].unwrap().stakers.keys());
              for (const staker of eraStakers) {
                if (!stakers.includes(staker)) {
                  stakers.push(staker);
                }
              }
            }
          }
          return stakers;
        })
      )
  );
}
