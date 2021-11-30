import { optionsWithEdgeware } from '@webb-tools/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { LoggerService } from '@webb-tools/app-util';

const ENDPOINT = 'ws://localhost:9944';
const apiLogger = LoggerService.get('Api');

// const blockHash = process.argv[0];

async function main() {
  apiLogger.info('Connecting to ', ENDPOINT);
  const provider = new WsProvider([ENDPOINT]);
  const opts = optionsWithEdgeware({ provider });
  const api = await ApiPromise.create(opts);
  await api.isReady;

  const metadata = await api.rpc.state.getMetadata();

  apiLogger.info('metadata of block: ' + JSON.stringify(metadata));
  await api.disconnect();
}

main().catch(apiLogger.error);
