/**
 * @file Generator
 */
'use strict';
const chalk = require('chalk');
module.exports = (api) => {
    // 执行脚本
    const extendScript = {
        scripts: {
            'add-gen': 'vue-cli-service add-gen'
        }
    };
    // 拓展 package.json 为其中的 scripts 中添加 add-gen 指令
    api.extendPackage(extendScript);

    // 插件安装成功后 输出一些提示 可以忽略
    console.log('');
    console.log(`Success: Add plugin success.`);
    console.log('');
    console.log('You can use it with:');
    console.log('');
    console.log(`   ${chalk.cyan('yarn add-component')}`);
    console.log('   or');
    console.log(`   ${chalk.cyan('yarn add-page')}`);
    console.log('');
    console.log('to create a component or page.');
    console.log('');
    console.log(`${chalk.green.bold('Enjoy it!')}`);
    console.log('');
};