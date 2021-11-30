// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api/types';
import type { Bytes, Option, U8aFixed, bool, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { DarkwebbPrimitivesDepositDetails, NodeTemplateRuntimeElement, PalletAnchorAnchorMetadata, PalletAnchorEdgeMetadata, PalletAnchorHandlerUpdateRecord, PalletMixerMixerMetadata } from '@webb-tools/types/interfaces/pallets';
import type { AccountId32 } from '@webb-tools/types/interfaces/runtime';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    anchor: {
      /**
       * A helper map for denoting whether an anchor is bridged to given chain
       **/
      anchorHasEdge: AugmentedQuery<ApiType, (arg: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => Observable<bool>, [ITuple<[u32, u32]>]> & QueryableStorageEntry<ApiType, [ITuple<[u32, u32]>]>;
      /**
       * The map of trees to their anchor metadata
       **/
      anchors: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<PalletAnchorAnchorMetadata>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The map of trees and chain ids to their edge metadata
       **/
      edgeList: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<PalletAnchorEdgeMetadata>, [u32, u32]> & QueryableStorageEntry<ApiType, [u32, u32]>;
      /**
       * The parameter maintainer who can change the parameters
       **/
      maintainer: AugmentedQuery<ApiType, () => Observable<AccountId32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map of trees to the maximum number of anchor edges they can have
       **/
      maxEdges: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u32>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The map of (tree, chain id) pairs to their latest recorded merkle root
       **/
      neighborRoots: AugmentedQuery<ApiType, (arg1: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array], arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<U8aFixed>>, [ITuple<[u32, u32]>, u32]> & QueryableStorageEntry<ApiType, [ITuple<[u32, u32]>, u32]>;
      /**
       * The next neighbor root index to store the merkle root update record
       **/
      nextNeighborRootIndex: AugmentedQuery<ApiType, (arg: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => Observable<u32>, [ITuple<[u32, u32]>]> & QueryableStorageEntry<ApiType, [ITuple<[u32, u32]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    anchorHandler: {
      /**
       * The map of trees to their anchor metadata
       **/
      anchorList: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<u32>, [U8aFixed]> & QueryableStorageEntry<ApiType, [U8aFixed]>;
      /**
       * The number of updates
       **/
      counts: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u64>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * sourceChainID => nonce => Update Record
       **/
      updateRecords: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u64 | AnyNumber | Uint8Array) => Observable<PalletAnchorHandlerUpdateRecord>, [u32, u64]> & QueryableStorageEntry<ApiType, [u32, u64]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    mixer: {
      /**
       * The parameter maintainer who can change the parameters
       **/
      maintainer: AugmentedQuery<ApiType, () => Observable<AccountId32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The map of trees to their mixer metadata
       **/
      mixers: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletMixerMixerMetadata>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * The map of trees to their spent nullifier hashes
       **/
      nullifierHashes: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: NodeTemplateRuntimeElement | string | Uint8Array) => Observable<bool>, [u32, NodeTemplateRuntimeElement]> & QueryableStorageEntry<ApiType, [u32, NodeTemplateRuntimeElement]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    verifier: {
      /**
       * Details of the module's parameters
       **/
      deposit: AugmentedQuery<ApiType, () => Observable<Option<DarkwebbPrimitivesDepositDetails>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The parameter maintainer who can change the parameters
       **/
      maintainer: AugmentedQuery<ApiType, () => Observable<AccountId32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Details of the module's parameters
       **/
      parameters: AugmentedQuery<ApiType, () => Observable<Bytes>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
