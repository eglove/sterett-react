// @ts-nocheck
import config from "@ethang/eslint-config/eslint.config.js";
import configReact from "@ethang/eslint-config/config.react.js";
import tseslint from "typescript-eslint";

export default tseslint.config(...config, ...configReact, {
  ignores: ["dist/"], // Your ignores directories
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "react/forbid-component-props": "off",
    "n/no-extraneous-import": "off",
  },
});
