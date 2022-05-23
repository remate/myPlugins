/**
 * @Description:使用该指令当文字内容超出宽度（默认100 px）时自动变为省略形式。等同于使用 css
 * @author tao.xie
 * @date 2021/8/23 2:00 下午
 */
export default function(el, binding) {
  el.style.width = binding.arg || 100 + 'px'
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
}
