/* eslint-env node */
module.exports = {
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    project: [
      './packages/shared/tsconfig.json',
      './packages/webpack-config/tsconfig.json',
      './services/host/tsconfig.json',
      './services/layout/tsconfig.json',
      './services/converter/tsconfig.json',
      './services/notes/tsconfig.json',
    ],
  },
  rules: {
    'react/no-array-index-key': 'warn',
    'max-len': ['error', { code: 120 }],
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': 'off',
    'react/function-component-definition': 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'operator-linebreak': 'off',
    'no-alert': 'off',
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
  },
};
