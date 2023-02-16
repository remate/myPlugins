import instance from '@/utils/request.js'
import { getQueryString } from '@/utils/url'

const clientSecret = process.env.VUE_APP_CLIENT_SECRET
// 用于区别是哪个服务
const client_id = getQueryString('flag')

// 刷新token，当access_token过期时可调用刷新
function refreshToken (refreshToken) {
  return instance({
    method: 'post',
    url: `/oauth2/oauth/token`,
    data: {
      client_id,
      clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }
  })
}

// 校验token是否有效
function checkToken (token) {
  return instance({
    method: 'get',
    url: `/oauth2/oauth/check_token`,
    opts: {
      params: { token }
    }
  })
}
// 统一获取三中心数据 根据所在部门后端封装的接口来调用
function getAuth (params) { // 代理根据自己项目的后端自己处理
  return instance({
    method: 'get',
    url: `/xxx/auth/getAuth`,
    params
  })
}

export {
  checkToken,
  refreshToken,
  getAuth
}
