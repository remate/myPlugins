const express = require('express')
// const cors = require('cors')
const app = express()
// app.use(cors())//通过dev-serve可以不通过cors设置
app.get('/api/getUserInfo', (req, res) => {
    res.send({
        name: 'heihei',
        age: 22
    })
    res.end();
})
app.listen(9000, () => {
    console.log('http://localhost:9000')
})