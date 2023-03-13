export default {
  rpc: {},
  types: {
    SmartContract: {
      _enum: {
        Evm: 'H160',
        Wasm: 'AccountId'
      }
    },
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
      _enum: ['NotForcing', 'ForceNew']
    }
  },
  typesAlias: {}
};
