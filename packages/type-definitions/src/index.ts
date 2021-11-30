import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';
import pallets from './pallets';
import versioned from './types-known/versioned';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  Address: 'AccountId',
  LookupSource: 'AccountId',
  PalletsOrigin: {
    _enum: {
      System: 'SystemOrigin',
      Timestamp: 'Null',
      RandomnessCollectiveFlip: 'Null',
      Balances: 'Null',
      // Vesting: 'Null',
      // Treasury: 'Null',
      Utility: 'Null',
      // Multisig: 'Null',
      // Recovery: 'Null',
      // Proxy: 'Null',
      // Scheduler: 'Null',
      Indices: 'Null',
      Authorship: 'Null',
      Aura: 'Null',
      Grandpa: 'Null',
      Staking: 'Null',
      Session: 'Null',
      Historical: 'Null',
      // Council: 'CollectiveOrigin',
      // Contracts: 'Null',
      // EVM: 'Null',
      Sudo: 'Null',
      TransactionPayment: 'Null'
    }
  }
};

const astarDefs = {
  pallets
};

export const types = {
  ...typesFromDefs(astarDefs),
  ...additionalOverride
};

export const typesBundle = {
  spec: {
    astar: {
      types: versioned
    }
  }
};

export const rpc = jsonrpcFromDefs(astarDefs, {});
export const typesAlias = typesAliasFromDefs(astarDefs, {});

const bundle = {
  types: [...versioned].map((version) => {
    return {
      types: {
        ...types,
        ...version.types
      }
    };
  }),
  alias: typesAlias
};

// Type overrides have priority issues
export const typesBundleForPolkadot = {
  spec: {
    astar: bundle
  }
};
