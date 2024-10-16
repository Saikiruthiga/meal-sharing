import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier"; // Import Prettier config
import prettierPlugin from "eslint-plugin-prettier"; // Prettier as a plugin

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  prettier, // Disables conflicting ESLint rules
  prettierPlugin.configs.recommended, // Use Prettier as an ESLint rule
];
