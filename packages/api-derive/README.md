![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# @astar-network/api-derive

Derived API calls that combine several queries to provide convinient results. This package is part of the Astar SDK.

## Example

```ts
import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';
import { AccountId } from '@polkadot/types/interfaces';

const getAddressEnum = (address: string) => ({ Evm: address });

const endpoint = 'wss://shiden.api.onfinality.io/public-ws';
const provider = new WsProvider(endpoint);

async function main(){
    const stakers = await api.derive.dappStaking.stakers();
    console.log({ stakers: stakers.map((s) => s.toHuman()) });
}().then(
    () => process.exit()
)
```

## Development

Clone the repo, run `yarn` and you should be good to go.

## Issues

Please see the COMMUNITY docs for contact and communication channels.
