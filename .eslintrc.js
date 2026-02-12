// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    "NODE_ENV": false,
    "VERSION": false
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-undef': 'off',
    // Disable strict vue rules
    'vue/multi-word-component-names': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/no-unused-components': 'off',
    'vue/valid-next-tick': 'off',
    // Disable cycle detection
    'import/no-cycle': 'off',
    // Disable style rules
    'max-len': 'off',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'object-curly-newline': 'off',
    'no-multiple-empty-lines': 'off',
    'function-paren-newline': 'off',
    'function-call-argument-newline': 'off',
    'no-promise-executor-return': 'off',
    'semi': 'off'
  }
}
