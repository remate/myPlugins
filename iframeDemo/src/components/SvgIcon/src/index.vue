<!--
 * @Author: zhoulf
 * @FilePath: /mobile-base/src/components/SvgIcon/src/index.vue
 * @Date: 2022-03-10 11:15:31
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-03-10 13:57:27
 * @Description:
-->
<template>
  <svg
    aria-hidden="true"
    :style="getStyle"
  >
    <use
      :href="symbolId"
      :fill="color"
    />
  </svg>
</template>
<script>
import { computed, toRefs } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const getStyle = computed(() => {
      const { size } = toRefs(props)
      let s = `${size.value}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s
      }
    })
    return { symbolId, getStyle }
  }
}
</script>
