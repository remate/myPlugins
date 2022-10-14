<template>
  <div class="tabs">
    <h3>二级页签</h3>
    <c-tabs>
      <c-tab-pane label="二级页签1">
        二级页签1内容
      </c-tab-pane>
      <c-tab-pane label="二级页签2">
        二级页签2内容
      </c-tab-pane>
      <c-tab-pane label="二级页签3">
        二级页签3内容
      </c-tab-pane>
    </c-tabs>
    <h3 style="margin-top: 30px">
      三级页签
    </h3>
    <c-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <c-radio-button label="top">
        标签
      </c-radio-button>
      <c-radio-button label="right">
        标签
      </c-radio-button>
      <c-radio-button label="bottom">
        标签
      </c-radio-button>
      <c-radio-button label="left" disabled>
        标签
      </c-radio-button>
    </c-radio-group>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  data () {
    return {
      tabPosition: 'top',
      reverse: true
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs{
  padding: 20px;

}
</style>
