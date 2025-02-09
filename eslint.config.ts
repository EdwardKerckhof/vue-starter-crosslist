import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"],
    },

    {
        name: "app/files-to-ignore",
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "*lock.json"],
    },

    pluginVue.configs["flat/recommended"],
    vueTsConfigs.recommended,
    skipFormatting,
    {
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", fixStyle: "separate-type-imports" },
            ],
            "@typescript-eslint/no-misused-promises": [2, { checksVoidReturn: { attributes: false } }],
            "@typescript-eslint/ban-ts-comment": "error",
            "no-console": "warn",
            "func-style": ["error", "declaration"],
            "arrow-parens": ["error", "always"],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    }
);
