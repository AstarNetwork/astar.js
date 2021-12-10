import { extendEnvironment } from 'hardhat/config';
import { evmConverter } from '../../sdk-core/src/converter';

import './type-extensions';

extendEnvironment((hre) => {
  hre.astar = evmConverter;
});
