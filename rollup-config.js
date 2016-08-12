import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/app.js',
  dest: 'dist/components.js',
  format: 'umd',
  moduleName: 'funponent',
  plugins: [
    buble({jsx: 'h'}),
    commonjs({include: 'node_modules/**'}),
    nodeResolve(),
  ],
};
