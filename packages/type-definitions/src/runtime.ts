export default {
  rpc: {},
  types: {
    ShidenRuntimeSmartContract: {
      _enum: ['Evm', 'Wasm']
    },
    Evm: 'H160',
    Wasm: 'AccountId',
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
  },
  typesAlias: {}
};
