/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    '.eslintrc.cjs',
    'postcss.config.cjs',
    'tailwind.config.cjs',
    'vite.config.ts',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
