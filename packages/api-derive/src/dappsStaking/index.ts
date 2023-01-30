import { ApiInterfaceRx } from '@polkadot/api/types';
import { Observable, from } from 'rxjs';
import { memo } from '@polkadot/api-derive/util';
import { AccountId } from '@polkadot/types/interfaces';
import { ContractAddress } from '../types';

export const getAddressEnum = (address: string) => ({ Evm: address });

/**
 * @deprecated stakers is not supported in the current version of the dapps staking pallet
 */
export function stakers(
  instanceId: string,
  api: ApiInterfaceRx
): (contractAddress: ContractAddress) => Observable<AccountId[]> {
  return memo(
    instanceId,
    (contractAddress: ContractAddress): Observable<AccountId[]> => from([])
  );
}
