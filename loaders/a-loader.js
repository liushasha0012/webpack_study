const {interpolateName} = require('loader-utils');

module.exports = function(source) {
    console.log('a-loader excuted!');
    let path = interpolateName(this, '[name].[ext]', source);
    console.log(path);
    this.emitFile(path, source);

    return source;
}