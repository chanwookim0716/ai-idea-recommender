import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactRecommended from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";

export default [
  {
    ignores: ["dist/", "node_modules/"],
  },
  // Configuration for TypeScript files
  {
    files: ["**/*.{ts,tsx}"], // Only apply to TypeScript files
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsxRuntime: 'automatic', // Explicitly set automatic JSX runtime
        project: ['./tsconfig.json', './functions/tsconfig.json'],
      },
      globals: {
        ...globals.browser,
        PagesFunction: "readonly", // Add PagesFunction as a global
        React: "readonly", // Explicitly add React as a global
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReactRecommended.rules, // Use recommended rules from pluginReact
      ...pluginReactJsxRuntime.rules, // Add jsx-runtime specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // Disable prop-types as we are using TypeScript
      "react/display-name": "warn", // Warn for missing display names
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off", // Disable base JS rule when TS version is active
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
  // Configuration for JavaScript files (like eslint.config.js, vite.config.js)
  {
    files: ["**/*.{js,mjs,cjs,jsx}", "*.js", "*.mjs", "*.cjs"], // Apply to JavaScript files
    languageOptions: {
      globals: {
        ...globals.browser,
        PagesFunction: "readonly", // Also add to JS files if needed
        React: "readonly", // Explicitly add React as a global for JS files that might contain JSX
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsxRuntime: 'automatic', // Explicitly set automatic JSX runtime for JS files
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReactJsxRuntime.rules, // Add jsx-runtime specific rules for JS files if they contain JSX
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Keep JS unused vars as warn
    }
  }
];
