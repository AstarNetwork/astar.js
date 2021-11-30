#!/usr/bin/env node
// Copyright 2017-2020 @polkadot/dev authors & contributors
// SPDX-License-Identifier: Apache-2.0

const babel = require('@babel/cli/lib/babel/dir').default;
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const copySync = require('@open-web3/dev-config/scripts/copySync.cjs');
const execSync = require('@open-web3/dev-config/scripts/execSync.cjs');

const CONFIGS = ['babel.config.js', 'babel.config.cjs'];
const CPX = ['css', 'gif', 'hbs', 'jpg', 'js', 'json', 'png', 'svg', 'd.ts']
  .map((ext) => `src/**/*.${ext}`)
  .concat('package.json');

console.log('$ polkadot-dev-build-ts', process.argv.slice(2).join(' '));

function buildWebpack() {
  execSync('yarn polkadot-exec-webpack --config webpack.config.js --mode production');
}

async function buildBabel(dir) {
  // Get Root Configs
  const configs = CONFIGS.map((c) => path.join(process.cwd(), `../../${c}`));
  const babelConfig = configs.find((f) => fs.existsSync(f)) || configs[0];
  // Get local configs
  const localConfigs = CONFIGS.map((c) => path.join(process.cwd(), c));
  const localBabelConfig = localConfigs.find((f) => fs.existsSync(f));
  // Prefer to use local config over the root one.
  const conf = localBabelConfig || babelConfig;

  await babel({
    babelOptions: {
      configFile: conf
    },
    cliOptions: {
      extensions: ['.ts', '.tsx'],
      filenames: ['src'],
      ignore: '**/*.d.ts',
      outDir: path.join(process.cwd(), 'build'),
      outFileExtension: '.js'
    }
  });

  [...CPX]
    .concat(`../../build/${dir}/src/**/*.d.ts`, `../../build/packages/${dir}/src/**/*.d.ts`)
    .forEach((src) => copySync(src, 'build'));
}

async function buildJs(dir) {
  if (!fs.existsSync(path.join(process.cwd(), '.skip-build'))) {
    const { name, version } = require(path.join(process.cwd(), './package.json'));

    // if (!name.startsWith('@polkadot/')) {
    //   return;
    // }

    console.log(`*** ${name} ${version}`);

    mkdirp.sync('build');

    if (fs.existsSync(path.join(process.cwd(), 'public'))) {
      buildWebpack(dir);
    } else {
      await buildBabel(dir);
    }

    console.log();
  }
}

async function buildMonorepo() {
  execSync('yarn polkadot-dev-clean-build');
  const cw = process.cwd();
  const packages = path.join(cw, 'packages');
  execSync(`cd ` + packages + ' && yarn build');

  process.chdir('packages');

  execSync('tsc --emitDeclarationOnly --outdir ../build');

  const dirs = fs
    .readdirSync('.')
    .filter((dir) => fs.statSync(dir).isDirectory() && fs.existsSync(path.join(process.cwd(), dir, 'src')));

  for (const dir of dirs) {
    process.chdir(dir);

    await buildJs(dir);

    process.chdir('..');
  }

  process.chdir('..');
}

async function buildPolyrepo() {
  execSync('yarn polkadot-exec-tsc --outdir ./build');

  [...CPX].forEach((src) => copySync(src, './build'));
}

async function main() {
  if (!fs.existsSync(path.join(process.cwd(), 'packages'))) {
    buildPolyrepo();
  } else {
    buildMonorepo();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
