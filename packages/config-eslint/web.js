/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:prettier/recommended',
    'turbo',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['react-refresh', 'import', 'react', 'svg-jsx', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist/', '.*.js', 'node_modules/'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['error'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'builtin', 'index', 'sibling', 'parent', 'internal', 'object'],
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    'svg-jsx/camel-case-dash': 'error',
    'svg-jsx/camel-case-colon': 'error',
    'svg-jsx/no-style-string': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
