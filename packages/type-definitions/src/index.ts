import type { OverrideVersionedType } from '@polkadot/types/types';

import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';
import pallets from './pallets';

import astarVersioned from './specs/astar';
import shidenVersioned from './specs/shiden';
import shibuyaVersioned from './specs/shibuya';

// FIXME: currently we cannot override this in runtime definitions because the code generation script cannot handle overrides
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

export const rpc = jsonrpcFromDefs(astarDefs, {});
export const typesAlias = typesAliasFromDefs(astarDefs, {});

function getBundle(versioned: OverrideVersionedType[]) {
  return {
    rpc,
    instances: {
      council: ['generalCouncil']
    },
    types: [...versioned].map((version) => {
      return {
        minmax: version.minmax,
        types: {
          ...types,
          ...version.types
        }
      };
    }),
    alias: typesAlias
  };
}

export const typesBundle = {
  spec: {
    astar: getBundle(astarVersioned),
    shiden: getBundle(shidenVersioned),
    shibuya: getBundle(shibuyaVersioned)
  }
};

// Type overrides have priority issues
export const typesBundleForPolkadot = {
  spec: {
    astar: getBundle(astarVersioned),
    shiden: getBundle(shidenVersioned),
    shibuya: getBundle(shibuyaVersioned)
  }
};
