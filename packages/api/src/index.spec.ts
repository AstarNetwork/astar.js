import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';
import { PalletDappsStakingEraStakingPoints } from '@astar-network/astar-types/interfaces';
import { Option, StorageKey } from '@polkadot/types';

const getAddressEnum = (address: string) => ({ Evm: address });

const endpoint = 'wss://shiden.api.onfinality.io/public-ws';
const provider = new WsProvider(endpoint);

describe('astar-api', () => {
  const api = new ApiPromise(options({ provider }));
  beforeAll(async () => {
    await api.isReadyOrError;
  });

  test('api.query.dappsStaking.contractEraStake.entries', async (): Promise<void> => {
    const address = '0x072416b9df2382a62Df34956DffB7B0aDdf668F9';
    if (api === null) {
      fail('API is not initialized');
    }
    const stakingByEra = await api.query.dappsStaking.contractEraStake.entries<
    Option<PalletDappsStakingEraStakingPoints>
    >(getAddressEnum(address));
    stakingByEra.forEach(([era, stakeInfo]) => {
      // console.log({
      //   era: (era.toHuman() as any[])[1],
      //   stakeInfo: `${Object.keys(stakeInfo.unwrap().stakers.toHuman()).length} stakers`
      // });
      expect(era).toBeInstanceOf(StorageKey);
      expect(stakeInfo).not.toBeNull();
    });
  });

  afterAll(async () => {
    await api.disconnect();
  });
});
