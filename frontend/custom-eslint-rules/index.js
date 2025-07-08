// custom-eslint-rules/index.js
// ESLint plugin definition for custom rules

import noNonassetRequire from './no-nonasset-require.js';

export default {
  meta: {
    name: 'eslint-plugin-local',
    version: '1.0.0',
  },
  rules: {
    'no-nonasset-require': noNonassetRequire,
  },
};
