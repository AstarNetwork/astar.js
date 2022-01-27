import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';

async function connectToShiden() {
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  console.log((await api.rpc.system.properties()).toHuman());
}

async function connectToAstar() {
  const provider = new WsProvider('wss://astar.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  console.log((await api.rpc.system.properties()).toHuman());
}

(async () => {
  await connectToShiden();
  await connectToAstar();
  process.exit(0);
})();

