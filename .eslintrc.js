module.exports = {
  root: true,

  env: {
    node: true,
  },

  globals: {
    __webpack_public_path__: true,
  },

  extends: ["plugin:vue/essential", "@vue/airbnb"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-len": 0,
    quotes: 0,
    "comma-dangle": ["error", "only-multiline"],
    "arrow-parens": ["error", "as-needed"],
    camelcase: 0,
    "object-curly-newline": 0,
    "no-console": 0,
    "eol-last": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "no-new": 0,
    "no-unused-vars": 0,
    "import/no-cycle": 0,
    "class-methods-use-this": 0,
    "arrow-parens": 0,
    "operator-linebreak": 0,
    indent: 0,
    "no-nested-ternary": 0,
  },

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/typescript"],
};
