// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';

test('stakers', async (): Promise<void> => {
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  const res = await (api.derive as any).dappStaking.stakers();
  console.log({ res });
  await api.disconnect();
});
