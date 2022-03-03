// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@astar-network/astar-api';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';

const getAddressEnum = (address: string) => ({ Evm: address });

test('stakers', async (): Promise<void> => {
  const address = '0x072416b9df2382a62Df34956DffB7B0aDdf668F9';
  const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;
  const res = await api.query.dappsStaking.contractEraStake.entries<PalletDappsStakingEraStakingPoints>(
    getAddressEnum(address)
  );
  console.log({ res });
  await api.disconnect();
});
