module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-empty-function":"off",
    "@typescript-eslint/ban-ts-comment":"off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-this-alias": ["off"],
    "prefer-const": "off", // 使用const
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ],
    'no-async-promise-executor' : 'off',
    'no-misleading-character-class' : 'off',
    'no-useless-catch' : 'off'
  },
};
