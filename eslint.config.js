const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  js.configs.recommended,

  // Globally ignores - must be at the top level
  {
    ignores: [
      '__tests__/**',
      'e2e/**',
      'node_modules/**',
      'android/**',
      'ios/**',
      'docs/**',
      'scripts/**',
      '*.lock',
      'babel.config.js',
      'metro.config.js',
      'jest.config.js',
      'prettier.config.js',
      '**/*.json',
    ],
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-duplicate-imports': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-unused-styles': 'off',
    },
  },

  // JavaScript and JSX files - using the default parser with JSX support
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        console: 'readonly',
        global: 'readonly',
        process: 'readonly',
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-case-declarations': 'off',
      'no-duplicate-imports': 'error',
      'import/no-duplicates': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-inline-styles': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/no-unused-styles': 'off',
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^React$|^_',
          ignoreRestSiblings: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
