import definitions from '@polkadot/types/interfaces/runtime/definitions';
import { Definitions } from '@polkadot/types/types';
import runtime from '@astar-network/type-definitions/runtime';

export default {
  rpc: {},
  types: {
    ...definitions.types,
    ...runtime.types
  }
} as Definitions;
