<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-input v-model="input.value1" placeholder="请输入" />
    </CodeBox>
    <CodeBox title="禁用">
      <c-input v-model="input.value2" placeholder="禁用" disabled />
    </CodeBox>
    <CodeBox title="尺寸">
      <c-input v-model="input.value3" placeholder="默认尺寸" />
      <c-input v-model="input.value4" size="large" placeholder="大尺寸（large）" />
      <c-input v-model="input.value5" size="medium" placeholder="中尺寸（medium、small）" />
      <c-input v-model="input.value6" size="mini" placeholder="小尺寸（mini）" />
    </CodeBox>
    <CodeBox title="前后缀">
      <c-input v-model="input.value7" placeholder="请输入内容">
        <template slot="prepend">
          http://
        </template>
      </c-input>
      <c-input v-model="input.value8" placeholder="请输入内容">
        <template slot="append">
          .com
        </template>
      </c-input>
      <c-input v-model="input.value9" placeholder="请输入内容" class="input-with-select">
        <c-select
          slot="prepend"
          v-model="select"
          placeholder="地区"
          style="width: 80px"
        >
          <c-option label="浙江" value="1" />
          <c-option label="上海" value="2" />
          <c-option label="江苏" value="3" />
        </c-select>
      </c-input>
    </CodeBox>
    <CodeBox title="搜索">
      <c-autocomplete
        v-model="input.value10"
        :fetch-suggestions="querySearch"
        placeholder="请输入（激活触发搜索）"
        suffix-icon="c-icon-search"
      />
      <c-autocomplete
        v-model="input.value11"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        suffix-icon="c-icon-search"
        placeholder="请输入（输入触发搜索）"
      />
      <c-autocomplete
        disabled
        placeholder="禁用"
        suffix-icon="c-icon-search"
      />
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'CuiInput',
  data () {
    return {
      input: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: '',
        value11: ''
      },
      select: ''
    }
  },
  methods: {
    querySearch (queryString, cb) {
      const keywords = [
        { value: '富强' },
        { value: '民主' },
        { value: '文明' },
        { value: '和谐' }
      ]
      const results = queryString ? keywords.filter(k => k.value.indexOf(queryString) > -1) : keywords
      cb(results)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
  margin-right: 8px;
}

.el-autocomplete {
  width: 240px;
  margin-right: 8px;
}
</style>
