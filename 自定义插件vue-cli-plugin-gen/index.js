
const addGen = require('./src/add-gen');
module.exports = (api, options) => {
    // 向 vue-cli-service 中注册 add-gen 指令
    api.registerCommand('add-gen', () => {
        addGen(api);
    });
}