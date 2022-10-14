<template>
  <div class="code-box">
    <h3>{{title}}</h3>
    <div :class="['components', block ? 'block' : '']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeBox',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    block: Boolean
  }
}
</script>

<style lang="scss" scoped>
.code-box {
  padding-bottom: 32px;

  h3 {
    color: #333333;
    margin-top: 0;
    letter-spacing: 1px;
  }

  .components {
    // width: 100%;
    display: flex;
    align-items: flex-end;

    &.block {
      display: block;
    }
  }
}
</style>
