// https://github.com/polkadot-js/api/pull/4578
import { AccountId } from '@polkadot/types/interfaces';
import { Observable } from '@polkadot/types/types';

declare module '@polkadot/api-derive/derive' {
  export interface ExactDerive {
    dappStaking: {
      stakers: ReturnType<() => () => Observable<AccountId[]>>;
    };
  }
}
