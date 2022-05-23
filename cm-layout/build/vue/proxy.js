module.exports = {
    '^/oauth2': {
        target: "http://10.10.77.45:9000/",
        changeOrigin: true,
    },
    '^/api/admin': {
        target: "http://10.10.77.45:9000/",
        changeOrigin: true,
    },
    //获取用户体系的代理， 此代理根据不同项目需修改,现在的是ai的
    '^/dcm-street/': {
        target: 'http://10.10.70.22:8091',
        changeOrigin: true,
        onProxyReq: function (proxyReq) {
          proxyReq.removeHeader('origin')
        }
      },
}
