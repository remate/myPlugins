const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())//通过dev-serve可以不通过cors设置

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});


io.on('connection', function (socket) { // socket相关监听都要放在这个回调里
    console.log('登录1');

    socket.on("disconnect", function () {
        console.log("登出");
    });

    socket.on("hello", function (obj) {
        //延迟3s返回信息给客户端
            console.log('收到消息：' + obj);
            io.emit("hello", { msg: obj });
    });
});
server.listen(3001, () => {
    console.log('listening on *:3001');
});


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