module.exports = {
  '^/oauth2': {
    target: 'http://10.10.77.45:9000/',
    changeOrigin: true
  },
  '^/api/admin': {
    target: 'http://10.10.77.45:9000/',
    changeOrigin: true
  },
  // 公共下拉列表查询
  '^/sanitation-api': {
    target: 'http://10.10.71.211:8085',
    // target: "http://10.10.77.45:9884",
    changOrigin: true
  },
  // 获取用户体系的代理， 此代理根据不同项目需修改,现在的是ai的
  '^/dcm-street/': {
    target: 'http://10.10.70.22:8091',
    changeOrigin: true,
    onProxyReq: function (proxyReq) {
      proxyReq.removeHeader('origin')
    }
  }
}
