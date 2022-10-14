<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-checkbox>多选</c-checkbox>
    </CodeBox>
    <CodeBox title="半选">
      <c-checkbox indeterminate>
        半选
      </c-checkbox>
    </CodeBox>
    <CodeBox title="禁用">
      <c-checkbox disabled>
        未选
      </c-checkbox>
      <c-checkbox checked disabled>
        选中
      </c-checkbox>
    </CodeBox>
    <CodeBox title="多选组">
      <c-checkbox-group v-model="checkList">
        <c-checkbox label="A" />
        <c-checkbox label="B" />
        <c-checkbox label="C" />
        <c-checkbox label="D" />
      </c-checkbox-group>
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  data () {
    return {
      checkList: ['A']
    }
  }
}
</script>
