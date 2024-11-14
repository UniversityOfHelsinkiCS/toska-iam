/* eslint-disable import/no-named-as-default-member */
import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginImport from 'eslint-plugin-import'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,ts}'],
  },
  {
    ignores: ['vitest.config.ts'],
  },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginImport.flatConfigs.typescript,
  pluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'import/no-commonjs': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      ...tsEslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/no-require-imports': 'off',
      'import/no-commonjs': 'off',
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
]
