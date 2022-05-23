import watermark from '../utils/watarmark'
export default function Initializer() {
  // TODO 处理生命周期内的数据初始化，比如sessionStorage数据落入vuex

  // 设置水印
  watermark.set('cm-admin-base')
}
