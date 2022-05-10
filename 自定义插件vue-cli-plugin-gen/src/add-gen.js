const chalk = require('chalk');
const inquirer = require('inquirer');
module.exports = async (api) => {
    const {
        componentType,
        componentStyleType
    } = await inquirer.prompt([
        {
            name: 'componentType',
            type: 'list',
            message: `Please select your component type. ${chalk.yellow(
                '( .vue / .tsx / .jsx )'
            )}`,
            choices: [
                { name: 'SFC (.vue)', value: 'sfc' }
            ],
            default: 'sfc'
        },
        {
            name: 'componentStyleType',
            type: 'list',
            message: `Please select your component style type. ${chalk.yellow(
                '( .css / .sass / .scss / .less / .styl )'
            )}`,
            choices: [
                { name: 'CSS (.css)', value: '.css' },
                { name: 'SCSS (.scss)', value: '.scss' }
            ],
            default: '.scss'
        }
    ]);
}

