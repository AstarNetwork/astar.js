![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
# @astar

This library provides additional typing information for user to access Astar's modules by using [polkadot.js](https://github.com/polkadot-js/api)

# Getting Started

More documentation and examples on [wiki](https://github.com/webb-tools/astar.js/wiki)

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

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [api-utils](./packages/api-utils)
  - Contains utility classes such as logging for end-user applications.
- [types](./packages/types)
  - Polkadot.js type definitions for Astar Network.
