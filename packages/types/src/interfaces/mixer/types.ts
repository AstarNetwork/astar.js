// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Option, Struct, U8aFixed, Vec, i128, u64 } from '@polkadot/types';
import type { TreeId } from '@webb-tools/types/interfaces/merkle';
import type { AccountId, Balance, BlockNumber } from '@webb-tools/types/interfaces/runtime';

/** @name Amount */
export interface Amount extends i128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name Commitment */
export interface Commitment extends ScalarData {}

/** @name CurrencyId */
export interface CurrencyId extends u64 {}

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends CurrencyId {}

/** @name MixerInfo */
export interface MixerInfo extends Struct {
  readonly minimum_deposit_length_for_reward: BlockNumber;
  readonly fixed_deposit_size: Balance;
  readonly currency_id: CurrencyIdOf;
}

/** @name Nullifier */
export interface Nullifier extends ScalarData {}

/** @name ScalarData */
export interface ScalarData extends U8aFixed {}

/** @name WithdrawProof */
export interface WithdrawProof extends Struct {
  readonly mixer_id: TreeId;
  readonly cached_block: BlockNumber;
  readonly cached_root: ScalarData;
  readonly comms: Vec<Commitment>;
  readonly nullifier_hash: ScalarData;
  readonly proof_bytes: Bytes;
  readonly leaf_index_commitments: Vec<Commitment>;
  readonly proof_commitments: Vec<Commitment>;
  readonly recipient: Option<AccountId>;
  readonly relayer: Option<AccountId>;
}

export type PHANTOM_MIXER = 'mixer';
