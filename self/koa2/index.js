const Koa = require("koa");
const app = new Koa();
// const fs = require('fs');
// const koaBody = require('koa-body');//可以用来提取post请求里的键值对,还可以用来处理文件上传
const compose = require('koa-compose');//可以合并多个中间件
const route = require('koa-route');
const main = route.get("/", ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page1</a>';
})
const about = route.get("/about", ctx => {
  ctx.response.body = 'Hello World';
  // ctx.throw(500);//抛出错误
  // ctx.response.status = 404;
  // ctx.response.body = 'Page Not Found';//这两步相当于ctx.throw(404)
})
// app.on('error', (err, ctx) => {//err事件监听
//   console.error(1212);
// });
// ctx.cookies.set('view', 'view');//设置cookie
// app.use(koaBody());
app.use(compose([main, about]));//合并中间件后使用一次use
app.listen(3000);
