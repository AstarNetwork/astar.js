// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';
import type { Bytes, U8aFixed, u128, u32, u8 } from '@polkadot/types';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { AnyNumber } from '@polkadot/types/types';
import type { NodeTemplateRuntimeElement, PalletAnchorEdgeMetadata } from '@webb-tools/types/interfaces/pallets';
import type { AccountId32, Call } from '@webb-tools/types/interfaces/runtime';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    anchor: {
      create: AugmentedSubmittable<(maxEdges: u32 | AnyNumber | Uint8Array, depth: u8 | AnyNumber | Uint8Array, asset: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u8, u32]>;
      deposit: AugmentedSubmittable<(treeId: u32 | AnyNumber | Uint8Array, leaf: NodeTemplateRuntimeElement | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, NodeTemplateRuntimeElement]>;
      forceSetMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    anchorHandler: {
      /**
       * This will be called by bridge when proposal to create an
       * anchor has been successfully voted on.
       **/
      executeAnchorCreateProposal: AugmentedSubmittable<(srcChainId: u32 | AnyNumber | Uint8Array, rId: U8aFixed | string | Uint8Array, maxEdges: u32 | AnyNumber | Uint8Array, treeDepth: u8 | AnyNumber | Uint8Array, asset: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, U8aFixed, u32, u8, u32]>;
      /**
       * This will be called by bridge when proposal to add/update edge of an
       * anchor has been successfully voted on.
       **/
      executeAnchorUpdateProposal: AugmentedSubmittable<(rId: U8aFixed | string | Uint8Array, anchorMetadata: PalletAnchorEdgeMetadata | { srcChainId?: any; root?: any; height?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [U8aFixed, PalletAnchorEdgeMetadata]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    mixer: {
      create: AugmentedSubmittable<(depositSize: u128 | AnyNumber | Uint8Array, depth: u8 | AnyNumber | Uint8Array, asset: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128, u8, u32]>;
      deposit: AugmentedSubmittable<(treeId: u32 | AnyNumber | Uint8Array, leaf: NodeTemplateRuntimeElement | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, NodeTemplateRuntimeElement]>;
      forceSetMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      withdraw: AugmentedSubmittable<(id: u32 | AnyNumber | Uint8Array, proofBytes: Bytes | string | Uint8Array, root: NodeTemplateRuntimeElement | string | Uint8Array, nullifierHash: NodeTemplateRuntimeElement | string | Uint8Array, recipient: AccountId32 | string | Uint8Array, relayer: AccountId32 | string | Uint8Array, fee: u128 | AnyNumber | Uint8Array, refund: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Bytes, NodeTemplateRuntimeElement, NodeTemplateRuntimeElement, AccountId32, AccountId32, u128, u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    verifier: {
      forceSetMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      forceSetParameters: AugmentedSubmittable<(parameters: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      setMaintainer: AugmentedSubmittable<(newMaintainer: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId32]>;
      setParameters: AugmentedSubmittable<(parameters: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
