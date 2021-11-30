![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# @astar api

This library provides additional typing information for user to access Astar's modules by using [polkadot.js](https://github.com/polkadot-js/api)

# Getting Started

More documentation and examples on [wiki](https://github.com/webb-tools/webb.js/wiki)

- Install dependencies

```bash
yarn add @polkadot/api @astar/api@beta
```

- Create API instance

```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar/api';

async function main() {
    const provider = new WsProvider('wss://localhost:9944');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // use the api
    //..
}

main()
```

- Use api to interact with node

```ts
// query and display account data
const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
console.log(data.toHuman())
```

# Scripts
You will also find a number of scripts inside this API. To run the scripts, you will want to use the following command:
```
yarn script <PATH_TO_SCRIPT>
```
For example, if you want to generate a quadratic distribution of all balances on Edgeware at some block hash, you can run the following command:
```
yarn script scripts/edgeware/getQuadraticDistribution.ts
```

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [app-util](./packages/app-util)
  - Utilities to work with Webb Network
- [types](./packages/types)
  - Polkadot.js type definations for Webb Network.
