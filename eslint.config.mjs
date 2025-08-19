import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    rules: {
      "no-self-assign": "error",
      "no-unreachable": "error",
      "use-isnan": "error",
      "no-global-assign": "error",
      "no-redeclare": "warn",
      "no-useless-catch": "warn",
      "no-useless-escape": "warn",
      "no-irregular-whitespace": "warn",
      "no-unused-vars": "warn",
      "no-undef": "off",
      "camelcase": "warn",
      "curly": "warn",
    },
  },
]);
