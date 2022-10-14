<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-date-picker
        v-model="value1"
        type="date"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
        placeholder="选择日期"
      />
      <c-date-picker
        v-model="value2"
        type="week"
        format="yyyy/第WW周"
        placeholder="选择周"
      />
      <c-date-picker
        v-model="value3"
        type="month"
        format="yyyy/MM"
        placeholder="选择月"
      />
      <c-date-picker
        v-model="value4"
        type="year"
        placeholder="选择年"
      />
    </CodeBox>
    <CodeBox title="日期范围">
      <c-date-picker
        v-model="value5"
        type="daterange"
        format="yyyy/MM/dd"
        range-separator="—"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <c-date-picker
        v-model="value8"
        type="datetimerange"
        format="yyyy/MM/dd HH:mm:ss"
        range-separator="—"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </CodeBox>
    <CodeBox title="时间选择">
      <c-time-picker
        v-model="value6"
        format="yyyy/MM/dd"
        placeholder="时间选择"
      />
    </CodeBox>
    <CodeBox title="日期时间选择">
      <c-date-picker
        v-model="value7"
        type="datetime"
        format="yyyy/MM/dd HH:mm:ss"
        value-format="yyyy/MM/dd HH:mm:ss"
        placeholder="日期时间选择"
      />
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      value1: '2022/09/09',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '2022/09/09 12:00:01',
      value8: ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-date-editor {
  margin-right: 8px;
}
</style>
