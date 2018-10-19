import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    entry: 'src/index.js',
    external: ['swagger-client', 'prop-types', 'react', 'redux-saga','hoist-non-react-statics','immutable'],
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        runtimeHelpers: true,
      }),
    ],
    sourceMap: true,
  },
];
