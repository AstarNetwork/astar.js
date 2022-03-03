import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';
import { BTreeMap, Option, Struct } from '@polkadot/types';
import { AccountId, Balance, EraIndex } from '@polkadot/types/interfaces';

interface EraStakingPoints extends Struct {
  readonly total: Balance;
  readonly stakers: BTreeMap<AccountId, Balance>;
  readonly formerStakedEra: EraIndex;
  readonly claimedRewards: Balance;
}

const getAddressEnum = (address: string) => ({ Evm: address });
// const getEraStakes = async (
//   api: ApiPromise,
//   contractAddress: string
// ): Promise<Map<number, Option<EraStakingPoints>>> => {
//   console.log({ contractAddress });
//   const eraStakes = await api.query.dappsStaking.contractEraStake.entries<EraStakingPoints>(
//     getAddressEnum(contractAddress)
//   );

//   let eraStakeMap = new Map();
//   eraStakes.forEach(([key, stake]) => {
//     eraStakeMap.set(parseInt(key.args.map((k) => k.toString())[1]), stake);
//   });

//   return eraStakeMap;
// };

// Convert a hex string to a byte array
// function hexToBytes(hex:any) {
//   for (var bytes = [], c = 0; c < hex.length; c += 2)
//       bytes.push(parseInt(hex.substr(c, 2), 16));
//   return bytes;
// }

// Convert a byte array to a hex string
// function bytesToHex(bytes:any) {
//   for (var hex = [], i = 0; i < bytes.length; i++) {
//       var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
//       hex.push((current >>> 4).toString(16));
//       hex.push((current & 0xF).toString(16));
//   }
//   return hex.join("");
// }

async function main() {
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  // Different addresses failing for different reasons
  // const contractAddress = '0xae4fe19acd45e405c4cfbea281c7a3af20a10849';
  // const contractAddress = '0xad9659fD787e70222Cf190Cf2467d54b580271F7';
  const contractAddress = '0xa5efb5bf75bbb607dc243707a83f2af5ed4e9813';
  const currentEra = await (await api.query.dappsStaking.currentEra<EraIndex>()).toNumber();
  for (let era = currentEra; era > 0; era -= 1) {
    const stakeInfoPromise = await api.query.dappsStaking.contractEraStake<Option<EraStakingPoints>>(
      getAddressEnum(contractAddress),
      era
    );
    const stakeInfo = await stakeInfoPromise.unwrapOr(undefined);

    if (stakeInfo) {
      console.log({ stakeInfo });
    }
  }
  // const staking = await getEraStakes(api, contractAddress);
  // console.log({ staking });
  await api.disconnect();
}
main();
