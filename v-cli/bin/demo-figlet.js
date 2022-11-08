// 方式一 callback调用

var figlet = require('figlet');
figlet('zuoci', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
});

// 方式二 通过promise包装

let { promisify } = require('util')
let asyncFiglet = promisify(require('figlet'))
async function run () {
  try {
    let data = await asyncFiglet('shutiao & youyou')
    console.log(data)
  } catch (error) {
    console.log(error)
  }

}
run()

