![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
# @astar-network

This library provides additional typing information for user to access Astar's modules by using [polkadot.js](https://github.com/polkadot-js/api)

# Getting Started

More documentation and examples on [wiki](https://github.com/astarNetwork/astar.js/wiki)

- Install dependencies

```bash
yarn add @polkadot/api @astar-network/astar-api
```

- Create API instance

```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';

async function main() {
    const provider = new WsProvider('ws://localhost:9944');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());

    process.exit(0);
}

main()
```

- Use api to interact with node.

```ts
// query and display account data
const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
console.log(data.toHuman())
```

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [api-derive](./packages/api-derive)
  - Contains utility classes and derived methods.
- [types-definitions](./packages/type-definitions)
  - Polkadot.js type definitions for Astar Network.
- [types](./packages/types)
  - Polkadot.js type definitions for Astar Network.
- [sdk-core](./packages/sdk-core)
  - core api libraries
- [precomplies](./packages/precompiles)
  - precomplied contracts abi

## How-to

### Update polkadot libraries

```shell
yarn up @polkadot/api @polkadot/api-augment @polkadot/api-derive @polkadot/rpc-core @polkadot/types @polkadot/types-codec
```


# Interact with Wasm Smart Contract

Example: Here is a dapp example that uses Astar.js to interact with WASM smart contract. You can find the source code [dApp](https://github.com/astarNetwork/wasm-lottery)
This is a simple lottery dapp that allows users to enter and draw the lottery. The lottery is implemented as a WASM smart contract.
The code snippets are taken from [Home.tsx](https://github.com/AstarNetwork/wasm-lottery/blob/master/src/Home.tsx) file.

### Usage

#### Connecting to API

```js
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';
import { sendTransaction } from '@astar-network/astar-sdk-core';

async function main() {
    const provider = new WsProvider('ws://localhost:9944');
    // OR
    // const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // Use the api
    // For example:
    console.log((await api.rpc.system.properties()).toHuman());

    process.exit(0);
}

main()
```

#### Initialise Contract Class

```js
import { Abi, ContractPromise } from '@polkadot/api-contract'

// After compiling the contract a ABI json is created in the artifacts. Import the ABI:
// If you didn't use swanky the name will be metadata.json
import ABI from './artifacts/lottery.json'

const abi = new Abi(ABI, api.registry.getChainProperties())

// Initialise the contract class
const contract = new ContractPromise(api, abi, address) // address is the deployed contract address
```

#### Query Contract Messages

```js

// Get the gas WeightV2 using api.consts.system.blockWeights['maxBlock']
const gasLimit = api.registry.createType(
    'WeightV2',
    api.consts.system.blockWeights['maxBlock']
  )

// Query the contract message
const { gasRequired, result, output } = await contract.query.pot(
    account.address,
    {
      gasLimit,
    }
  )
```

#### Send Contract Transaction

Sending contract transaction normally is a 2 step process. First is to query the transaction and check for errors. We have a helper function to do this for you. The second step is to send the transaction. The helper function will return the transaction object which you can use to sign and send the transaction.
The parameters for the helper function are:

- api: The api instance
- contract: The contract instance
- message: The message to send
- sender: The sender address
- value: The value to send with the transaction
- ...params: The parameters for the message

```js

import { sendTransaction } from '@astar-network/astar-sdk-core';

try {
  const result = await sendTransaction(api, contract, 'enter', account.address, new BN('1000000000000000000'))

  result.signAndSend(account.address, (res) => {
    if (res.status.isInBlock) {
      console.log('in a block')
    }
    if (res.status.isFinalized) {
      console.log('finalized')
      console.log('Successfully entered in lottery!')
    }
  })
} catch (error) {
  if (error.isErr) {
    let display = ''
    if (error.asErr.isModule) {
      const dispatchError = api.registry.findMetaError(error.asErr.asModule)
      console.log('error', dispatchError.name)
      display = dispatchError.docs.length ? dispatchError.docs.concat().toString() : dispatchError.name
    } else {
      display = error.asErr.toString()
    }

    console.log(display)
    return
  }

  if (error.isOk) {
    const flags = error.asOk.flags.toHuman()
    if (flags.includes('Revert')) {
      console.log('Revert')
      const type = contract.abi.messages[5].returnType
      const typeName = type?.lookupName || type?.type || ''
      const error = contract.abi.registry.createTypeUnsafe(typeName, [error.asOk.data]).toHuman()

      console.log(error ? (error as any).Err : 'Revert')
      return
    }
  }
}
```

#### SDK-Core Library Functions

Here is the list of functions and their brief explanations:

1. `fetchNativeBalance`: Fetches the native balance of a given account from the Polkadot network.
2. `getVested`: Calculates the vested amount in an account based on current block, start block, per block vesting amount, and total locked amount.
3. `isValidAddressPolkadotAddress`: Checks whether a provided string is a valid Polkadot address.
4. `checkSumEvmAddress`: Converts an Ethereum address to a checksum address.
5. `isValidEvmAddress`: Validates if a string is a valid Ethereum address.
6. `toSS58Address`: Converts a hexadecimal address to a SS58 format address.
7. `buildEvmAddress`: Builds a valid Ethereum address from a string that can either be a Polkadot address or an Ethereum address.
8. `getShortenAddress`: Returns a shortened address by displaying only the first and last few characters, with the rest replaced by dots.
9. `getPubkeyFromSS58Addr`: Extracts the public key from a SS58 formatted address.
10. `objToArray`: Converts an object into an array without maintaining property keys.
11. `checkIsNullOrUndefined`: Checks if the provided value is null or undefined.
12. `capitalize`: Capitalizes the first letter of the input string and turns the rest into lower case.
13. `getRandomFromArray`: Returns a random item from an array.
14. `wait`: Creates a promise that resolves after a specified number of milliseconds.
15. `truncate`: Truncates a number to a specified number of decimal places without rounding.
16. `scrollTo`: Scrolls to the HTML element with the provided id.
17. `getQueryParams`: Retrieves query parameters from the current URL and returns them as an object.
18. `getTimestamp`: Returns the current timestamp in seconds.
19. `paginate`: Returns a sub-array from the provided array based on page number and size.
20. `ExtrinsicPayload`: Exports the type `SubmittableExtrinsic<'promise'>` from the '@polkadot/api/types' package as `ExtrinsicPayload`.
21. `sendTransaction`: Sends a transaction to a smart contract on a Polkadot network.
22. `getDappStakers`: Returns the number of stakers on the DApp.
23. `getDappAddressEnum`: Returns an object with the contract address and its format.
24. `checkIsDappOwner`: Checks whether the given account address is the owner of the DApp.
25. `checkIsDappRegistered`: Checks if the DApp is registered and returns the era at which the DApp was unregistered.
26. `getNumberOfUnclaimedEra`: Returns the number of eras that have not been claimed by the DApp and checks if withdrawal is required.
27. `getContractEraStake`: Queries the API for contract era stake data.
28. `eraSkippedZeroStake`: Finds the next era after the DApp has unstaked all its amount.
29. `getTxsForClaimDapp`: Assembles an array of transactions for the DApp to claim rewards from past eras.
30. `getTxsForClaimStaker`: Assembles an array of transactions for stakers to claim rewards from past eras.
31. `getFirstEraDappHasNotClaimed`: Returns the first era that the DApp has not claimed.
32. `getLastEraClaimedForDapp`: Returns the last era claimed for the DApp.
33. `getIndividualClaimTxs`: Returns a list of transactions for staker and DApp claims.
34. `RewardDistributionConfig`: Describes the structure of reward distribution configuration.
35. `fetchRewardsDistributionConfig`: Fetches reward distribution configuration from Polkadot API.
36. `removeKSeparator`: Removes all comma characters from a string.
37. `fmtAmtFromKSeparator`: Removes any commas from a string and formats the resulting string as Ether.
38. `estimatePendingRewards`: Calculates the estimated pending rewards for a given wallet address.
39. `getEvmGas`: Retrieves the gas price for Ethereum Virtual Machine (EVM) transactions.
40. `getEvmGasCost`: Calculates the cost of gas for a transaction.
41. `formatTip`: Converts the provided fee into ether format.
42. `fetchEvmGasPrice`: Fetches gas price from an API and formats it accordingly.
43. `getUsdBySymbol`: Fetches the price of a token in USD.
44. `calUsdAmount`: Fetches the USD price for a given token symbol and multiplies it by an amount.
45. `mergeTvlArray`: Merges the TVL (Total Value Locked) array based on the base type.
46. `getTvlData`: Fetches TVL data for the `ecosystem` and `dappStaking` for a given network.
47. `filterTvlData`: Filters the TVL data array based on the provided duration.
48. `castDurationToDaysNumber`: Converts a duration string to the corresponding number of days.
49. `getClaimedAmount`: Fetches and returns the claimed amount for a given account on a specific network.
50. `fetchTransferDetails`: Fetches and returns the details of a transfer transaction on a given network.
51. `fetchXvmAssetsTransferHistories`: Fetches and returns the XVM assets transfer history for a given sender and contract address.
52. `fetchDappsStats`: Fetches and returns the stats of a specific dapp on a given network.
53. `filterStatsData`: Filters the stats data array based on the provided filter duration.
54. `fetchDappTransactions`: Fetches and returns the transaction stats of a specific dapp on a given network.
55. `fetchDappUAW`: Fetches and returns the UAW (Unique Active Wallets) stats of a specific dapp on a given network.
56. `defaultAmountWithDecimals`: Converts a value into the given token decimal point without losing decimals.
57. `setDefaultUnitName`: Sets a new default name in the `arrUnitNames` array.
58. `getUnitNames`: Returns the array `arrUnitNames` containing the unit names.
59. `getUnit`: Returns the corresponding unit from the `arrUnitPrefixes` array.
60. `nFormatter`: Returns a string representation of a number in a more readable format.
61. `formatNumber`: Formats a number by adding weight prefix and considering decimal places.
