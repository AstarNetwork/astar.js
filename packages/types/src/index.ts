import { typesBundle as astarTypesBundle, types as astarTypes, typesAlias as astarTypeAlias, rpc as astarRpc } from '@astar-network/astar-type-definitions';
import { OverrideBundleType, OverrideModuleType, RegistryTypes, DefinitionRpc, DefinitionRpcSub } from '@polkadot/types/types';
import './interfaces/augment-fixes';
import './interfaces/augment-types';
import './interfaces/augment-api-consts';
import './interfaces/augment-api-errors';
import './interfaces/augment-api-events';
import './interfaces/augment-api-query';
import './interfaces/augment-api-tx';
import './interfaces/augment-api-rpc';
import './interfaces/augment-api-runtime';

export const types: RegistryTypes = astarTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = astarRpc;

export const typesAlias: Record<string, OverrideModuleType> = astarTypeAlias;

export const typesBundle = astarTypesBundle as OverrideBundleType;
