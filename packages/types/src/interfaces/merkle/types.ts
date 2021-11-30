// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, Vec, bool, u32, u8 } from '@polkadot/types';
import type { ScalarData } from '@webb-tools/types/interfaces/mixer';
import type { AccountId } from '@webb-tools/types/interfaces/runtime';

/** @name HashFunction */
export interface HashFunction extends Enum {
  readonly isPoseidonDefault: boolean;
  readonly isPoseidonExp3: boolean;
  readonly isPoseidonExp5: boolean;
  readonly isPoseidonExp17: boolean;
  readonly isMiMc: boolean;
  readonly isBlake2: boolean;
  readonly isSha256: boolean;
}

/** @name KeyId */
export interface KeyId extends u32 {}

/** @name Manager */
export interface Manager extends Struct {
  readonly accountId: AccountId;
  readonly required: bool;
}

/** @name MerkleTree */
export interface MerkleTree extends Struct {
  readonly leaf_count: u32;
  readonly max_leaves: u32;
  readonly depth: u8;
  readonly root_hash: ScalarData;
  readonly edge_nodes: Vec<ScalarData>;
  readonly hasher: HashFunction;
  readonly should_store_leaves: bool;
}

/** @name TreeId */
export interface TreeId extends u32 {}

export type PHANTOM_MERKLE = 'merkle';
