<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-input-number v-model="value1" />
    </CodeBox>
    <CodeBox title="禁用">
      <c-input-number v-model="value2" disabled />
    </CodeBox>
    <CodeBox title="不同尺寸">
      <c-input-number v-model="value3" />
      <c-input-number v-model="value4" size="mini" />
      <c-input-number v-model="value4" size="small" />
      <c-input-number v-model="value5" size="large" />
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  data () {
    return {
      value1: 0,
      value2: 20,
      value3: 0,
      value4: 10,
      value5: 20,
      value6: 30
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input-number {
  margin-right: 8px;
}
</style>
