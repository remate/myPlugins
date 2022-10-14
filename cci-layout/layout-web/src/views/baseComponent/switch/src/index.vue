<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-switch v-model="value1" />
    </CodeBox>
    <CodeBox title="禁用">
      <c-switch v-model="value2" disabled />
      <c-switch v-model="value3" disabled />
    </CodeBox>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: true,
      value2: true,
      value3: false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-switch {
  margin-right: 8px;
}
</style>
