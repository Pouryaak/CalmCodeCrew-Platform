module.exports = {
  ignorePatterns: ['.eslintrc.cjs', 'functions/**'],
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
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "no-param-reassign": ["error", { "props": false }],
    'react/jsx-props-no-spreading': 'off',
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [2, {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function"
    }],
     "react/prop-types": "off",
     "no-console": ["error", { "allow": ["warn", "error"] }],
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
