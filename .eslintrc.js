module.exports = {
//   parser: 'babel-eslint',
  extends: ['plugin:vue/essential'], // 如果是集成多个，可以写成数组的形式
  env: {
    node: true,
    browser: true,
  },
  // 如果继承的配置不满足要求，则可以自己添加rules配置，改写规则
//   rules: {
//       semi: ['error', '4'],
//       quotes: ['error', 'single'],
//   },
};