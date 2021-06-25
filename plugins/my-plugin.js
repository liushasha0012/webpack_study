module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log(`name：`,this.options.name);
        console.log('my plugin excuted');
    }
}