<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-select v-model="value1" placeholder="请选择">
        <c-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </c-select>
    </CodeBox>
    <CodeBox title="多选">
      <c-select v-model="value2" placeholder="请选择" multiple>
        <c-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </c-select>
      <c-select
        v-model="value3"
        placeholder="请选择"
        multiple
        collapse-tags
      >
        <c-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </c-select>
    </CodeBox>
    <CodeBox title="分组">
      <c-select v-model="value4" placeholder="请选择">
        <c-option-group
          v-for="group in groupOptions"
          :key="group.label"
          :label="group.label"
        >
          <c-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </c-option-group>
      </c-select>
    </CodeBox>
    <CodeBox title="搜索">
      <c-select
        v-model="value5"
        filterable
        clearable
        placeholder="请选择"
      >
        <c-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </c-select>
    </CodeBox>
    <CodeBox title="禁用">
      <c-select
        v-model="value7"
        disabled
        placeholder="禁用"
      />
      <c-select
        v-model="value8"
        placeholder="请选择"
        multiple
        disabled
      >
        <c-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </c-select>
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'CuiSelect',
  data () {
    return {
      options: [
        { value: '1', label: '富强' },
        { value: '2', label: '民主' },
        { value: '3', label: '文明' },
        { value: '4', label: '和谐' }
      ],
      groupOptions: [
        {
          label: '前端',
          options: [
            { value: '1', label: 'vue' },
            { value: '2', label: 'react' },
            { value: '3', label: 'angular', disabled: true }
          ]
        },
        {
          label: '后端',
          options: [
            { value: '4', label: 'java' },
            { value: '5', label: 'go' },
            { value: '6', label: 'rust' }
          ]
        }
      ],
      value1: '',
      value2: ['1', '2'],
      value3: ['1', '2'],
      value4: '',
      value5: '',
      value7: '',
      value8: ['1', '2']
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-select {
    margin-right: 12px;
  }
}
</style>
