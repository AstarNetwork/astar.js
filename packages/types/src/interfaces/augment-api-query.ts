// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/storage';

import type { AccountId32, PalletDappsStakingEraRewardAndStake, PalletDappsStakingEraStakingPoints, PalletDappsStakingForcing, ShidenRuntimeSmartContract } from '@astar-network/astar-types/interfaces/runtime';
import type { ApiTypes, AugmentedQuery, QueryableStorageEntry } from '@polkadot/api-base/types';
import type { Null, Option, bool, u128, u32 } from '@polkadot/types-codec';
import type { AnyNumber } from '@polkadot/types-codec/types';
import type { Observable } from '@polkadot/types/types';

export type __AugmentedQuery<ApiType extends ApiTypes> = AugmentedQuery<ApiType, () => unknown>;
export type __QueryableStorageEntry<ApiType extends ApiTypes> = QueryableStorageEntry<ApiType>;

declare module '@polkadot/api-base/types/storage' {
  interface AugmentedQueries<ApiType extends ApiTypes> {
    dappsStaking: {
      /**
       * Accumulator for block rewards during an era. It is reset at every new era
       **/
      blockRewardAccumulator: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Stores amount staked and stakers for a contract per era
       **/
      contractEraStake: AugmentedQuery<ApiType, (arg1: ShidenRuntimeSmartContract | { Evm: any } | { Wasm: any } | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletDappsStakingEraStakingPoints>>, [ShidenRuntimeSmartContract, u32]> & QueryableStorageEntry<ApiType, [ShidenRuntimeSmartContract, u32]>;
      /**
       * The current era index.
       **/
      currentEra: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Total block rewards for the pallet per era and total staked funds
       **/
      eraRewardsAndStakes: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletDappsStakingEraRewardAndStake>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Mode of era forcing.
       **/
      forceEra: AugmentedQuery<ApiType, () => Observable<PalletDappsStakingForcing>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Bonded amount for the staker
       **/
      ledger: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u128>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Enable or disable pre-approval list for new contract registration
       **/
      preApprovalIsEnabled: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * List of pre-approved developers
       **/
      preApprovedDevelopers: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Null>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Registered dapp points to the developer who registered it
       **/
      registeredDapps: AugmentedQuery<ApiType, (arg: ShidenRuntimeSmartContract | { Evm: any } | { Wasm: any } | string | Uint8Array) => Observable<Option<AccountId32>>, [ShidenRuntimeSmartContract]> & QueryableStorageEntry<ApiType, [ShidenRuntimeSmartContract]>;
      /**
       * Registered developer accounts points to coresponding contract
       **/
      registeredDevelopers: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<ShidenRuntimeSmartContract>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
