![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
# @astar-network

This library provides additional typing information for user to access Astar's modules by using [polkadot.js](https://github.com/polkadot-js/api)

# Getting Started

More documentation and examples on [wiki](https://github.com/astarNetwork/astar.js/wiki)

- Install dependencies

```bash
yarn add @polkadot/api@9.13.6 @astar-network/astar-api@0.1.19
```

**📝NOTE: Please use @polkadod/api version 9.13.6 with  @astar-network/astar-api version 0.1.19 **

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