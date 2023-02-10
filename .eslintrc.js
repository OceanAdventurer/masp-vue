// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    // 在函数名和括号之前需要(always)或不允许(never)使用空格
    "space-before-function-paren": ["error", "always"],
    // 需要(always)或不允许(never)使用分号
    "semi": ["error", "never"],
    // 允许有括号
    "no-extra-parens": 0,
    "indent": 0,
    "spaced-comment": 0 // 注释风格要不要有空格
  },
  // 忽略检测全局变量
  globals:{
    BMap: true,
    BMAP_NORMAL_MAP: true,
    BMAP_HYBRID_MAP: true,
    BMAP_SATELLITE_MAP: true,
    BMAP_PERSPECTIVE_MAP: true
  }
}
