const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms',
});

process.chdir(path.join(__dirname, 'template')); // 进入 tempalte 文件夹

rimraf('./dist', () => {
  const config = require('../../lib/webpack.prod.js');

  webpack(config, (err, stats) => {
    if (err) {
      console.warn(err);
      process.exit(2); // 错误码报出2
      return;
    }
    console.log('构建成功啦');
    console.log(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
      })
    );
    console.log('开始测试用例');

    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'js-test.js'));

    mocha.run(); // 跑用例
  });
});
