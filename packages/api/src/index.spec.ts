import { options } from '@astar-network/astar-api';
import { ApiPromise, WsProvider } from '@polkadot/api';

const endpoint = 'wss://shiden.api.onfinality.io/public-ws';
const provider = new WsProvider(endpoint);

describe('astar-api', () => {
  const api = new ApiPromise(options({ provider }));
  beforeAll(async () => {
    await api.isReadyOrError;
  });

  test('api.query.dappStaking.contractStake', async (): Promise<void> => {
    if (api === null) {
      fail('API is not initialized');
    }
    const stakingByEra = await api.query.dappStaking.contractStake(0);
    expect(stakingByEra).not.toBeNull();
  });

  afterAll(async () => {
    await api.disconnect();
  });
});
