const getters = {
  token: state => state.user.token,
  idaastoken: state => state.user.idaastoken,
  tokenValid: state => state.token.tokenValid,
  menu: state => state.permission.menu,
  userData: state => state.user.userData
}
export default getters
