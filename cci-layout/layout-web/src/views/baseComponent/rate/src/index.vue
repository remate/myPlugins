<template>
  <div class="page-demo">
    <CodeBox title="基础">
      <c-rate v-model="value1" />
    </CodeBox>
    <CodeBox title="半星">
      <c-rate v-model="value2" allow-half />
    </CodeBox>
    <CodeBox title="带信息">
      <c-rate v-model="value3" show-score score-template="{value}分" />
    </CodeBox>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  data () {
    return {
      value1: null,
      value2: 2.5,
      value3: 5
    }
  }
}
</script>
