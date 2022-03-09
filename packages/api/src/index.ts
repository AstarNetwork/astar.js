/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { derive as astarDerive } from '@astar-network/astar-api-derive';
import { rpc as astarRpc, types as astarTypes, typesAlias as astarTypesAlias, typesBundle as astarTypesBundle } from '@astar-network/astar-types';
import { derive as ormlDerive } from '@open-web3/orml-api-derive';

import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: astarTypes,
  rpc: astarRpc
};

export const options = ({ types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions }: ApiOptions = {}): ApiOptions => ({
  types: {
    ...astarTypes,
    ...types
  },
  rpc: {
    ...astarRpc,
    ...rpc
  },
  typesAlias: {
    ...astarTypesAlias,
    ...typesAlias
  },
  derives: {
    ...ormlDerive,
    ...astarDerive
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      astar: {
        ...astarTypesBundle?.spec?.astar,
        ...typesBundle?.spec?.astar
      },
      shiden: {
        ...astarTypesBundle?.spec?.shiden,
        ...typesBundle?.spec?.shiden
      },
      shibuya: {
        ...astarTypesBundle?.spec?.shibuya,
        ...typesBundle?.spec?.shibuya
      }
    }
  },
  ...otherOptions
});
