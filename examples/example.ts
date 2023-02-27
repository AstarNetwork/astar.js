const {
    ApiPromise,
    WsProvider
} = require('@polkadot/api');
const provider = new WsProvider('wss://rpc.shiden.astar.network');
import { options } from '@astar-network/astar-api';

//using @astar-network/astar-api  from https://www.npmjs.com/package/@astar-network/astar-api
async function setupAPI1() {

    const api = new ApiPromise(options({
        provider
    }));
    await api.isReady;
    // use the api
    //..
    return api
}

//using polkadot.js OverrideBundleDefinition https://github.com/polkadot-js/apps/blob/master/packages/apps-config/src/api/spec/shiden.ts
async function setupAPI2() {
    var OverrideBundleDefinition = {"types":[{"minmax":[0,null],"types":{"Keys":"AccountId","Address":"MultiAddress","LookupSource":"MultiAddress","AmountOf":"Amount","Amount":"i128","SmartContract":{"_enum":{"Evm":"H160","Wasm":"AccountId"}},"EraStakingPoints":{"total":"Balance","stakers":"BTreeMap<AccountId, Balance>","formerStakedEra":"EraIndex","claimedRewards":"Balance"},"PalletDappsStakingEraStakingPoints":{"total":"Balance","stakers":"BTreeMap<AccountId, Balance>","formerStakedEra":"EraIndex","claimedRewards":"Balance"},"EraRewardAndStake":{"rewards":"Balance","staked":"Balance"},"PalletDappsStakingEraRewardAndStake":{"rewards":"Balance","staked":"Balance"},"EraIndex":"u32"}}]}
    const api = new ApiPromise(({
        provider: provider,
        types: OverrideBundleDefinition.types
    }));
    await api.isReady;
    // use the api
    //..
    return api
}

async function main() {

    // test block 0x6a0d236f07573e33d92d30f95b837f6784d3a9f06d18c660ae4d3edfcb1ae474
    var [_, blockNumber, blockHash] = [22007, 731690, "0x6a0d236f07573e33d92d30f95b837f6784d3a9f06d18c660ae4d3edfcb1ae474"];

    console.log(`TESTING SHIDEN BN=${blockNumber}, blkHash=${blockHash}`)
    // using @astar-network/astar-api
    console.log(`**** @astar-network/astar-api STRAT***`)
    var api1 = await setupAPI1()
    try {
        var signedBlock1 = await api1.rpc.chain.getBlock(blockHash);
        console.log(`signedBlock1`, signedBlock1)
    } catch (err1){
        console.log(`@astar-network/astar-api failed err`, err1)
    }

    console.log(`\n\n\n**** polkadot.js OverrideBundleDefinition STRAT***`)
    // using polkadot.js OverrideBundleDefinition https://github.com/polkadot-js/apps/blob/master/packages/apps-config/src/api/spec/shiden.ts
    var api2 = await setupAPI2()
    try {
        var signedBlock2 = await api2.rpc.chain.getBlock(blockHash);
        console.log(`signedBlock2`, signedBlock2)
    } catch (err2){
        console.log(`polkadot.js OverrideBundleDefinition failed err`, err2)
    }
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error('ERROR', e);
        process.exit(1);
    });