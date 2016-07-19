/**
 * `npm test` - to run all tests.
 * `npm test ./test/submodule` - to run all tests within `./test/submodule`.
 *
 * Cross-platform script to lint src/test files and execute Mocha tests.
 */
const process = require('process');
const script = require('./script');
const mochaOpts = script.mochaOpts;

// remove first 2 arguments... first arg is usually the path to nodejs, and
// the second arg is script location
const args = process.argv.slice(2);

// if user passes argument, set first argument as `testDirPath`, otherwise use default value from
// package.json
const testDirPath = args.length ? args[0] : process.env.npm_package_config_test_dir_path;

const srcDirPath = process.env.npm_package_config_src_dir_path;

const eslint = `eslint ${srcDirPath} ${testDirPath} --color`;

const mocha = `mocha ${testDirPath} ${mochaOpts} --colors`;

script.run(`${eslint} && ${mocha}`);
