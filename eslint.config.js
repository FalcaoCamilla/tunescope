import { FlatConfig } from '@angular-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.app.json'],
      },
    },
    plugins: {
      '@angular-eslint': require('@angular-eslint/eslint-plugin'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      ...require('@angular-eslint/eslint-plugin').configs.recommended.rules,
      "@typescript-eslint/no-inferrable-types": "off"
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: require('@angular-eslint/template-parser'),
    },
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
    },
    rules: {
      ...require('@angular-eslint/eslint-plugin-template').configs.recommended.rules,
    },
  },
];