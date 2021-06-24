const path = require('path');
module.exports = {
    entry: path.join(__dirname, '../src/loader_test/index.js'),
    output: {
        filename: 'loaderTest.js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [path.join(__dirname, '../loaders/a-loader.js')]
            }
        ]
    }
}