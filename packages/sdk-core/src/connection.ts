import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';

export async function connection(endpoint: string): Promise<ApiPromise> {
  const provider = new WsProvider(endpoint);
  const api = new ApiPromise(options({ provider }));

  await api.isReady;

  return api;
}
