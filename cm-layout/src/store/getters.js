/*
 * @Author: zhoulf
 * @FilePath: /create-cm-cli-app/generators/templates/pc/src/store/getters.js
 * @Date: 2021-12-20 19:51:37
 * @LastEditors: zhoulf
 * @LastEditTime: 2021-12-21 11:33:41
 * @Description: 
 */
const getters = {
  token: state => state.user.token,
  idaastoken: state => state.user.idaastoken,
  tokenValid: state => state.token.tokenValid,
  menu: state => state.permission.menu,
  userData: state => state.user.userData
}
export default getters
