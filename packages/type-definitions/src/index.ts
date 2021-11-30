import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';

import mixer from './mixer';
import merkle from './merkle';
import pallets from './pallets';
import versioned from './types-known/versioned';

// FIXME: currently we cannot override this in runtime definations because the code generation script cannot handle overrides
// This will make it behave correctly in runtime, but wrong types in TS defination.
const additionalOverride = {
  Address: 'AccountId',
  LookupSource: 'AccountId',
  Keys: 'SessionKeys2',
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
      TransactionPayment: 'Null',
      Merkle: 'Null',
      Mixer: 'Null'
    }
  }
};

const webbDefs = {
  mixer,
  merkle,
  pallets
};

export const types = {
  ...typesFromDefs(webbDefs),
  ...additionalOverride
};

export const typesBundle = {
  spec: {
    webb: {
      types: versioned
    }
  }
};

export const rpc = jsonrpcFromDefs(webbDefs, {});
export const typesAlias = typesAliasFromDefs(webbDefs, {});

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
    webb: bundle
  }
};
