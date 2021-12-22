import type { OverrideVersionedType } from '@polkadot/types/types';

const definitions: OverrideVersionedType[] = [
  {
    minmax: [0, undefined],
    types: {
      Keys: 'AccountId',
      ShidenRuntimeSmartContract: {
        _enum: {
          Evm: 'H160',
          Wasm: 'AccountId'
        }
      },
      PalletDappsStakingEraIndex: 'u32',
      PalletDappsStakingEraStakingPoints: {
        total: 'Balance',
        stakers: 'BTreeMap<AccountId, Balance>',
        _formerStakedEra: 'EraIndex',
        claimedRewards: 'Balance'
      },
      PalletDappsStakingEraRewardAndStake: {
        rewards: 'Balance',
        staked: 'Balance'
      },
      PalletDappsStakingForcing: {
        _enum: ['NotForcing', 'ForceNew', 'ForceNone', 'ForceAlways']
      }
    }
  }
];

export default definitions;
