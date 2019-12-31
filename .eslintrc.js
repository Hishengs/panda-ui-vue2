module.exports = {
  "extends": "airbnb-base",
  "plugins": ["html"],
  "rules": {
    // "linebreak-style": ["error", "windows"],
    "linebreak-style": "off",
    // 该规则推荐文件扩展名忽略
    "import/extensions": "off",
    // 该规则推荐使用 forEach 代替 for-in, for-of
    "no-restricted-syntax": "off",
    // 该规则推荐不写 console
    "no-console": "off",
    // 推荐最后一个 import 后面必须跟空行
    "import/newline-after-import": "off",
    // 强制文件最后必须以空行结束
    "eol-last": "warn",
    // 不允许给 default 重命名
    "import/no-named-default": "warn",
    // 使用箭头函数时，只有一个参数也必须使用括号包含进来
    "arrow-parens": "off",
    // 在箭头函数只有一个 return 语句时，不使用花括号
    "arrow-body-style": "off",
    // 在函数参数圆括号前不允许有空格
    "space-before-function-paren": "off",
    // 在函数体花括号前必须有一个空格
    "space-before-blocks": "off",
    "max-len": "off",
    "eol-last": "off",
    "no-plusplus": "off",
    "no-else-return": "off",
    "no-underscore-dangle": "off",
    "comma-dangle": "off",
    "no-param-reassign": "off",
    "no-lonely-if": "off",
    "func-names": "off",
    "prefer-template": "warn",
    "object-curly-newline": "off",
    "no-new": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'space-before-function-paren': 'off',
    'no-underscore-dangle': 'off',
    'no-else-return': 'off',
    'lines-between-class-members': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-return-await': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'prefer-template': 'warn',
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-await-in-loop': 'off',
    'no-lonely-if': 'off',
    'import/no-named-as-default-member': 'off',
    'no-nested-ternary': 'off'
  },
};