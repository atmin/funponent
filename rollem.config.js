const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

const plugins = [
  buble({
    jsx: 'h',
    objectAssign: 'Object.assign',
  }),
  commonjs({include: 'node_modules/**'}),
  nodeResolve(),
];

module.exports = [{
  entry: 'src/funponent/index.js',
  dest: 'dist/funponent.js',
  format: 'umd',
  moduleName: 'funponent',
  plugins: plugins,
}, {
  entry: 'src/docs/components/index.js',
  dest: 'docs/components.js',
  plugins: plugins,
}];
