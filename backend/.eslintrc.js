module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest:true//biggest use of eslint to work with jest gloabal function
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};
