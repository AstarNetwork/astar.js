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

async function extrinsics(blockNumber: number) {
  const provider = new WsProvider('wss://astar.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
  // returns SignedBlock
  const signedBlock = await api.rpc.chain.getBlock(blockHash);

  // the hash for the block, always via header (Hash -> toHex()) - will be
  // the same as blockHash above (also available on any header retrieved,
  // subscription or once-off)
  console.log(signedBlock.block.header.hash.toHex());

  // the hash for each extrinsic in the block
  signedBlock.block.extrinsics.forEach((ex, index) => {
    console.log(index, ex.hash.toHex());


    const { isSigned, meta, method: { args, method, section } } = ex;

    // explicit display of name, args & documentation
    console.log(`${section}.${method}(${args.map((a) => a.toString()).join(', ')})`);
    console.log(meta.docs.map((d) => d.toString()).join('\n'));

    // signer/nonce info
    if (isSigned) {
      console.log(`signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`);
    }
  });
}




(async () => {
  await connectToShiden();
  await connectToAstar();
  await extrinsics(2297834);
  process.exit(0);
})();

