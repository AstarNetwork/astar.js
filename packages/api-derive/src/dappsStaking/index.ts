import { ApiInterfaceRx } from '@polkadot/api/types';
import { Observable, of } from 'rxjs';
import { memo } from '@polkadot/api-derive/util';
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
    (contractAddress: ContractAddress): Observable<AccountId[]> => of([])
  );
}
