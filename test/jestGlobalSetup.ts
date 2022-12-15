require('tsconfig-paths/register');

import 'src/setup-env';

module.exports = async function globalTestSetup() {
  // no behavior but jest expects a function to be exported
};
