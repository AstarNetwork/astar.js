import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@astar-network/astar-api';

const getAddressEnum = (address: string) => ({ Evm: address });
const address = '0x072416b9df2382a62Df34956DffB7B0aDdf668F9';

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
    stakers.forEach((s) => expect(s.length).toBe(32));
  });

  afterAll(async () => {
    await api.disconnect();
  });
});
