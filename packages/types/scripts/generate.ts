/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/ban-ts-comment */
/* @ts-ignore */

import { TypeRegistry } from '@polkadot/types/create';
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry';
import { generateTsDef } from '@polkadot/typegen/generate/tsDef';
import { generateDefaultConsts } from '@polkadot/typegen/generate/consts';
import { generateDefaultQuery } from '@polkadot/typegen/generate/query';
import { generateDefaultTx } from '@polkadot/typegen/generate/tx';
import { registerDefinitions } from '@polkadot/typegen/util';
import metaHex from '../src/metadata/static-latest';
import fs from 'fs';
import * as defaultDefinitions from '@polkadot/types/interfaces/definitions';

import * as webbDefinitions from '../src/interfaces/definitions';
import { Metadata } from '@polkadot/types';

// Only keep our own modules to avoid confllicts with the one provided by polkadot.js
// TODO: make an issue on polkadot.js
function filterModules(names: string[], defs: any): string {
  const registry = new TypeRegistry();
  registerDefinitions(registry, defs);
  const metadata = new Metadata(registry, metaHex);
  // hack https://github.com/polkadot-js/api/issues/2687#issuecomment-705342442
  metadata.asLatest.toJSON();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const filtered = metadata.toJSON() as any;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  filtered.metadata.v14.pallets = filtered?.metadata?.v14?.pallets?.filter(({ name }: any) => {
    return names.includes(name);
  });
  return new Metadata(registry, filtered).toHex();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { runtime, ...substrateDefinitions } = defaultDefinitions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const definitions = {
  '@polkadot/types/interfaces': substrateDefinitions,
  '@webb-tools/types/interfaces': webbDefinitions
} as any;

const metadata = filterModules(['Anchor', 'AnchorHandler', 'bridge', 'Hasher', 'Mixer', 'Mt', 'Verifier'], definitions);
const augmentApiIndex = `
/* eslint-disable */
export * from './augment-api-consts';
export * from './augment-api-tx';
export * from './augment-api-query';
export * from './augment-types';
`.trim();
generateTsDef(definitions, 'packages/types/src/interfaces', '@webb-tools/types/interfaces');
generateInterfaceTypes(definitions, 'packages/types/src/interfaces/augment-types.ts');
generateDefaultConsts('packages/types/src/interfaces/augment-api-consts.ts', metadata, definitions);

generateDefaultTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definitions);
generateDefaultQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definitions);

fs.writeFileSync('packages/types/src/interfaces/augment-api.ts', augmentApiIndex);
