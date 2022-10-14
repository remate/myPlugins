<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-radio v-model="radio1" label="1">
        是
      </c-radio>
    </CodeBox>
    <CodeBox title="禁用">
      <c-radio v-model="radio2" disabled label="1">
        是
      </c-radio>
      <c-radio v-model="radio3" disabled label="1">
        否
      </c-radio>
    </CodeBox>
    <CodeBox title="单选组">
      <c-radio-group v-model="radio4">
        <c-radio label="1">
          是
        </c-radio>
        <c-radio label="2">
          否
        </c-radio>
      </c-radio-group>
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  data () {
    return {
      radio1: '0',
      radio2: '1',
      radio3: '0',
      radio4: '1'
    }
  }
}
</script>
