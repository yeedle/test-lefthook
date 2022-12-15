import { stopGlobalNestAppIfRunning } from '@trialspark/toolbox';

require('tsconfig-paths/register');

global.afterEach(async () => {
  await stopGlobalNestAppIfRunning();
});
