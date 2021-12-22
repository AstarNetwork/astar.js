import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';


async function main() {
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  console.log({ api });
}

main();
