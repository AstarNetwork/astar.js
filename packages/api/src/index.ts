import {
  rpc as webbRpc,
  types as webbTypes,
  typesAlias as webbTypesAlias,
  typesBundle as webbTypesBundle
} from '@webb-tools/types';
import { spec as edgewareTypes } from '@edgeware/node-types';
import { ApiOptions } from '@polkadot/api/types';
import * as edgewareDefinitions from '@edgeware/node-types/dist/src/interfaces/definitions';

const edgTypes = Object.values(edgewareDefinitions).reduce((res, { types }) => ({ ...res, ...types }), {});

export const defaultOptions: ApiOptions = {
  types: webbTypes,
  rpc: webbRpc
};

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...webbTypes,
    ...types
  },
  rpc: {
    ...webbRpc,
    ...rpc
  },
  typesAlias: {
    ...webbTypesAlias,
    ...typesAlias
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      webb: {
        ...webbTypesBundle?.spec?.webb,
        ...typesBundle?.spec?.webb
      }
    }
  },
  ...otherOptions
});

export const optionsWithEdgeware = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...webbTypes,
    ...edgTypes,
    ...types,
    Address: 'MultiAddress',
    LookupSource: 'MultiAddress'
  },
  rpc: {
    ...webbRpc,
    ...rpc
  },
  typesAlias: {
    ...webbTypesAlias,
    ...typesAlias
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      ...edgewareTypes.typesBundle.spec,
      webb: {
        ...webbTypesBundle?.spec?.webb,
        ...typesBundle?.spec?.webb
      }
    }
  },
  ...otherOptions
});
