<template>
  <div class="page-demo">
    <CodeBox title="基础" block>
      <c-slider v-model="value1" />
    </CodeBox>
    <CodeBox title="禁用" block>
      <c-slider v-model="value2" disabled />
    </CodeBox>
    <CodeBox title="区间" block>
      <c-slider v-model="value3" range />
    </CodeBox>
    <CodeBox title="输入" block>
      <c-slider v-model="value4" show-input />
    </CodeBox>
    <CodeBox title="标签" block>
      <c-slider v-model="value4" :marks="marks" />
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      value1: 10,
      value2: 30,
      value3: [40, 60],
      value4: 90,
      marks: {
        0: '0',
        100: '100'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-slider {
  width: 300px;
  margin-left: 24px;
}
</style>
