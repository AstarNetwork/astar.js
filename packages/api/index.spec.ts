// Copyright 2017-2022 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';

const getAddressEnum = (address: string) => ({ Evm: address });

describe('astar-api', () => {
  let api: ApiPromise | null = null;
  beforeAll(async () => {
    const provider = new WsProvider('wss://shiden.api.onfinality.io/public-ws');
    api = new ApiPromise(options({ provider }));
    await api.isReady;
  });

  test('api.query.dappsStaking.contractEraStake.entries', async (): Promise<void> => {
    const address = '0x072416b9df2382a62Df34956DffB7B0aDdf668F9';
    if (api === null) {
      fail(`API is not initialized`);
    }
    const stakingByEra = await api.query.dappsStaking.contractEraStake.entries<PalletDappsStakingEraStakingPoints>(
      getAddressEnum(address)
    );
    stakingByEra.forEach(([era, stakeInfo]) => {
      console.log({ era: era.toHuman(), stakeInfo: `${Object.keys(stakeInfo.toJSON().stakers).length} stakers` });
    });
  });

  afterAll(async () => {
    await api?.disconnect();
  });
});
