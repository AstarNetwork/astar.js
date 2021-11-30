// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { ApiTypes } from '@polkadot/api/types';
import type { u32 } from '@polkadot/types';
import type { FrameSupportPalletId } from '@polkadot/types/lookup';
import type { Codec } from '@polkadot/types/types';

declare module '@polkadot/api/types/consts' {
  export interface AugmentedConsts<ApiType> {
    mixer: {
      /**
       * Native currency id
       **/
      nativeCurrencyId: u32 & AugmentedConst<ApiType>;
      palletId: FrameSupportPalletId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  }
}
