// eslint.config.js - Flat config for ESLint v9+
import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import local from './custom-eslint-rules/index.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/build/**', '**/dist/**'],
  },
  eslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      local,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'import/no-commonjs': 'off',
      'global-require': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    plugins: { react: reactPlugin },
    settings: { react: { version: 'detect' } },
  },
);
