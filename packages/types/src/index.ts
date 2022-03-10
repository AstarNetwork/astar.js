import { typesBundle as astarTypesBundle, types as astarTypes, typesAlias as astarTypeAlias, rpc as astarRpc } from '@astar-network/astar-type-definitions';
import { OverrideBundleType, OverrideModuleType, RegistryTypes, DefinitionRpc, DefinitionRpcSub } from '@polkadot/types/types';
import './interfaces/augment-fixes';
import './interfaces/augment-api-query';
import './interfaces/augment-api-consts';
import './interfaces/augment-types';

export const types: RegistryTypes = astarTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = astarRpc;

export const typesAlias: Record<string, OverrideModuleType> = astarTypeAlias;

export const typesBundle = astarTypesBundle as OverrideBundleType;
