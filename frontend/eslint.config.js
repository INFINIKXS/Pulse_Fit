// eslint.config.js - Flat config for ESLint v9+
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import local from "./custom-eslint-rules/index.js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      local,
      "@typescript-eslint": tseslint.plugin
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json"
      }
    },
    rules: {
      "import/no-commonjs": "off",
      "global-require": "off",
      "no-undef": "off",
      // Custom rule: only allow require() for asset imports
      "local/no-nonasset-require": "error"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        sourceType: "module"
      }
    }
  },
  {
    plugins: {
      react: reactPlugin
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
