<template>
  <div class="page-demo">
    <CodeBox title="主题色">
      <div
        v-for="tc in themeColors"
        :key="tc"
        class="color-block"
        :style="{ background: tc }"
      >
        {{tc}}
      </div>
    </CodeBox>
    <CodeBox title="文本色">
      <div
        v-for="fc in fontColors"
        :key="fc"
        class="color-block"
        :style="{ background: fc }"
      >
        {{fc}}
      </div>
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'Color',
  data () {
    return {
      themeColors: ['#3786FD', '#11C372', '#FDAD43', '#FF5B63'],
      fontColors: ['#333333', '#666666', '#999999', '#c0c0c0']
    }
  }
}
</script>

<style lang="scss" scoped>
.color-block {
  width: 220px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
</style>
