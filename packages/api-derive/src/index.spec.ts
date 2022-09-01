import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';

const getAddressEnum = (address: string) => ({ Evm: address });
const address = '0xf87c7872eff6f01de8efcb328471967b19e302a9';

const endpoint = 'wss://shiden.api.onfinality.io/public-ws';
// const endpoint = 'ws://localhost:9944';
const provider = new WsProvider(endpoint);

describe('astar-api-derive', () => {
  const api = new ApiPromise(options({ provider }));
  beforeAll(async () => {
    await api.isReadyOrError;
  });

  test('api.derive.stakers', async (): Promise<void> => {
    if (api === null) {
      fail('API is not initialized');
    }
    const stakers = await api.derive.dappStaking.stakers(getAddressEnum(address));
    // If you want top print the result nicely... Go ahead.
    // console.log({ stakers: stakers.map((s) => s.toHuman()) });
    expect(stakers.length).toBeGreaterThan(0);
    stakers.forEach((s) => expect(s.length).toBe(32));
  });

  afterAll(async () => {
    await api.disconnect();
  });
});
