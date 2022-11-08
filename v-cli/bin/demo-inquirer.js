const inquirer = require('inquirer');//8.0.0使用require
inquirer.prompt([
  {
    name: 'userName',
    type: 'input',
    message: '你的名字叫什么？'
  },
  {
    name: 'age',
    type: 'checkbox',//空格选择
    message: '你多大了？',
    choices: ['16', '17', '18', '19']
  },
  {
    name: 'hobby',
    type: 'list',//回车选择
    message: '你的爱好？',
    choices: ['游泳', '下棋', '跑步', '爬山']
  }
]).then(answer => {
  console.log('回答内容', answer)
})

