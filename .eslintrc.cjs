module.exports = {
  root: true,
  env: { node: true, 'vitest-globals/env': true },
  extends: [
    'plugin:vitest-globals/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'standard',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    // 'no-console': [import.meta.env.NODE_ENV === 'production' ? 'error' : 'warn', { allow: ['error'] }],
    // 'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    'import/order': ['error', {
      alphabetize: { order: 'asc', caseInsensitive: true },
      'newlines-between': 'always',
      groups: ['builtin', 'external', 'index', 'parent', 'sibling', 'internal'],
    }],
  },
}
