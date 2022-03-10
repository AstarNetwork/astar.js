const base = require('@polkadot/dev/config/eslint.cjs');

module.exports = {
  ...base,
  ignorePatterns: [
    '.eslintrc.cjs',
    '.eslintrc.js',
    '.github/**',
    '.vscode/**',
    '.yarn/**',
    '**/build/*',
    '**/coverage/*',
    '**/node_modules/*',
    'scripts/**'
  ],
  parserOptions: {
    ...base.parserOptions,
    project: ['./tsconfig.json']
  },
  rules: {
    ...base.rules,
    '@typescript-eslint/no-explicit-any': 'off',
    'header/header': 'off',
    'sort-keys': 'off',
    'simple-import-sort/imports': 'off',
    'sort-destructure-keys/sort-destructure-keys': 'off',
    'padding-line-between-statements': 'off',
    'space-before-function-paren': 'off'
  }
};
