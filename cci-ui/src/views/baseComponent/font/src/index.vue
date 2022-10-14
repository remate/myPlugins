<template>
  <div class="page-demo">
    <CodeBox title="中文字体-苹果">
      <div class="font-box">
        苹方
      </div>
    </CodeBox>
    <CodeBox title="中文字体-windows">
      <div class="font-box">
        微软雅黑
      </div>
    </CodeBox>
    <CodeBox title="英文字体（单独在项目内英文标题场景下引用）">
      <div class="font-box roboto">
        Roboto
      </div>
    </CodeBox>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.font-box {
  width: 384px;
  height: 54px;
  line-height: 54px;
  background: #d8d8d8;
  text-align: center;
  font-size: 46px;
  font-weight: 700;
  background-color: #d8d8d8;

  &.roboto {
    font-family: Roboto-Bold;
  }
}
</style>
