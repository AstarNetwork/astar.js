/* eslint-disable */
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { Metadata } from '@polkadot/types';
import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import {
  generateDefaultConsts,
  generateDefaultQuery,
  generateDefaultTx,
  generateDefaultRpc,
  generateDefaultLookup
} from '@polkadot/typegen/generate';
import { registerDefinitions } from '@polkadot/typegen/util';
// import generateMobx from '@open-web3/api-mobx/scripts/mobx';
import metaHex from '../src/metadata/static-latest';

import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import * as ormlDefinitions from '@open-web3/orml-types/interfaces/definitions';

import * as astarDefinitions from '../src/interfaces/definitions';

// Only keep our own modules to avoid confllicts with the one provided by polkadot.js
// TODO: make an issue on polkadot.js
function filterModules(names: string[], defs: any): string {
  const registry = new TypeRegistry();
  registerDefinitions(registry, defs);
  const metadata = new Metadata(registry, metaHex);

  // hack https://github.com/polkadot-js/api/issues/2687#issuecomment-705342442
  metadata.asLatest.toJSON();

  const filtered = metadata.toJSON() as any;

  // console.log(filtered.metadata.v14.modules.map(x => x.name))

  filtered.metadata.v14.pallets = filtered.metadata.v14.pallets.filter(({ name }: any) => names.includes(name));

  return new Metadata(registry, filtered).toHex();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinitions } = defaultDefinitions;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime: _runtime, ...ormlModulesDefinitions } = ormlDefinitions;

const definitions = {
  '@polkadot/types/interfaces': substrateDefinitions,
  // '@open-web3/orml-types/interfaces': ormlModulesDefinitions,
  '@astar-network/astar-types/interfaces': astarDefinitions
} as any;

const metadata = filterModules(
  [
    'DappsStaking',
    'BlockReward',
    'EthCall'
  ],
  definitions
);

generateTsDef(definitions, 'packages/types/src/interfaces', '@astar-network/astar-types/interfaces');
generateInterfaceTypes(definitions, 'packages/types/src/interfaces/augment-types.ts');
generateDefaultConsts('packages/types/src/interfaces/augment-api-consts.ts', metadata, definitions);

// TODO: figure out why this failed
// generateDefaultTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definitions);
generateDefaultQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definitions);
generateDefaultRpc('packages/types/src/interfaces/augment-api-rpc.ts', definitions);
// generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definitions);