import { options } from '@webb-tools/api';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { LoggerService } from '@webb-tools/app-util';
import BN from 'bn.js';

const ENDPOINT = 'ws://localhost:9944';
const apiLogger = LoggerService.get('Api');

async function main() {
  apiLogger.info('Connecting to ', ENDPOINT);
  const provider = new WsProvider([ENDPOINT]);
  const opts = options({ provider });
  const api = await ApiPromise.create(opts);
  const result = await api.rpc.system.chain();
  apiLogger.info('🎉 Connected to ', result.toHuman());
  const targetAccount = process.argv[2];
  if (!targetAccount) {
    console.error('Usage: yarn script scripts/mint.ts <TARGET_ACCOUNT_ADDRESS>');
    process.exit(1);
  }
  const dem = new BN(10).pow(new BN(12));
  const amount = new BN(100_000).mul(dem);
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
  apiLogger.info(`Sending ${amount.div(dem)} to ${targetAccount}`);
  await api.tx.balances
    .transferKeepAlive(targetAccount, amount)
    .signAndSend(alice, async ({ status, dispatchError }) => {
      // status would still be set, but in the case of error we can shortcut
      // to just check it (so an error would indicate InBlock or Finalized)
      if (dispatchError) {
        if (dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(dispatchError.asModule);
          const { docs: documentation, name, section } = decoded;

          console.log(`${section}.${name}: ${documentation.join(' ')}`);
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          console.log(dispatchError.toString());
        }
      }
      if (status.isInBlock || status.isFinalized) {
        const info = await api.query.system.account(targetAccount);
        apiLogger.info('Your Current balance: ', info.data.free.toHuman());
        await api.disconnect();
      }
    });
}

main().catch(apiLogger.error);
