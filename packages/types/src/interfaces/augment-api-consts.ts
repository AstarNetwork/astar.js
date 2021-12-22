// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

declare module '@polkadot/api/types/consts' {
  import type { Perbill } from '@astar-network/astar-types/interfaces/runtime';
  import type { ApiTypes, AugmentedConst, QueryableModuleConsts } from '@polkadot/api/types';
  import type { u128, u16, u32 } from '@polkadot/types';
  import type { FrameSupportPalletId } from '@polkadot/types/lookup';
  import type { Codec } from '@polkadot/types/types';

  export interface AugmentedConsts<ApiType  extends ApiTypes> {
    blockReward: {
      /**
       * The amount of issuance for each block.
       **/
      rewardAmount: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    dappsStaking: {
      /**
       * Number of blocks per era.
       **/
      blockPerEra: u32 & AugmentedConst<ApiType>;
      /**
       * Number of eras of doubled claim rewards.
       **/
      bonusEraDuration: u32 & AugmentedConst<ApiType>;
      /**
       * Percentage of reward paid to developer.
       **/
      developerRewardPercentage: Perbill & AugmentedConst<ApiType>;
      /**
       * Number of eras that are valid when claiming rewards.
       * 
       * All the rest will be either claimed by the treasury or discarded.
       **/
      historyDepth: u32 & AugmentedConst<ApiType>;
      /**
       * Maximum number of unique stakers per contract.
       **/
      maxNumberOfStakersPerContract: u32 & AugmentedConst<ApiType>;
      /**
       * Minimum amount that should be left on staker account after staking.
       **/
      minimumRemainingAmount: u128 & AugmentedConst<ApiType>;
      /**
       * Minimum amount user must stake on contract.
       * User can stake less if they already have the minimum staking amount staked on that particular contract.
       **/
      minimumStakingAmount: u128 & AugmentedConst<ApiType>;
      /**
       * Dapps staking pallet Id
       **/
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Minimum bonded deposit for new contract registration.
       **/
      registerDeposit: u128 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    ethCall: {
      /**
       * The call processing fee amount.
       **/
      callFee: u128 & AugmentedConst<ApiType>;
      /**
       * The call magic number.
       **/
      callMagicNumber: u16 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  } // QueryableConsts

} // declare module
