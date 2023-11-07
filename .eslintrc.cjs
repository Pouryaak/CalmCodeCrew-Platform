module.exports = {
  ignorePatterns: ['.eslintrc.cjs'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    "react/react-in-jsx-scope": "off",
  "react/jsx-uses-react": "off",
    'no-undef': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'allow', // This allows for variable names with a leading underscore
      trailingUnderscore: 'allow', // This allows for variable names with a trailing underscore
    },
  ],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
