import { ApiPromise, Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import type { WeightV2 } from '@polkadot/types/interfaces';
import abiData from './abi';

async function contract(address: string) {
  const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  const abi = new Abi(abiData, api.registry.getChainProperties())

  const contract = new ContractPromise(api, abi, address)

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

  const { refTime, proofSize } = await api.consts.system.blockWeights['perClass'].maxExtrinsic;

  const { gasRequired } = await contract.query.flip(
    alice.address,
    {
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
      storageDepositLimit: null,
    }
  )

  const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2

  const result = await contract.tx
    .flip({
      gasLimit: gasLimit,
      storageDepositLimit: null
    })
    .signAndSend(alice.address, async (res) => {
      if (res.status.isInBlock) {
        console.log('in a block')
      } else if (res.status.isFinalized) {
        console.log('finalized')
      }
    })
}

(async () => {
  await contract('VxtNXGFuWwfzs4vRe8KRvrAjw5sL5fUmcTCK3oQXGa46pPz'); // Flipper
  process.exit(0);
})();

