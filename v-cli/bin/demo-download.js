let download = require('download-git-repo')
download('direct:https://gitee.com/remate_452642848/test.git', 'demo'/**下载到哪里 */, { clone: true }, function (err) {
  console.log(err ? 'Error' : 'Success')
})