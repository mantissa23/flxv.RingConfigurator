module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb', 'plugin:vue/recommended'],
  plugins: ['compat', 'prettier', 'vue'],
  rules: {
    // 'compat/compat': 'error',
    'object-shorthand': 'off',
    'dot-notation': 'off',
    'global-require': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['~'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
        ],
        'newlines-between': 'never',
      },
    ],
    'vue/valid-v-bind': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [],
      },
    ],
    'vue/html-self-closing': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
    'vue/no-v-html': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
