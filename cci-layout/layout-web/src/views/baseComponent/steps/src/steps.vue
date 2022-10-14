<template>
  <div class="steps">
    <h3>基础样式</h3>
    <c-steps :active="active" finish-status="success">
      <c-step title="步骤一" />
      <c-step title="步骤二" />
      <c-step title="步骤三" />
    </c-steps>
    <c-button style="margin-top: 12px;" @click="next">
      下一步
    </c-button>
    <h3>运行错误</h3>
    <c-steps
      align-center
      :active="active1"
      finish-status="success"
      :process-status="processStatus"
    >
      <c-step title="步骤一" />
      <c-step title="步骤二" />
      <c-step title="步骤三" />
    </c-steps>
    <c-button style="margin-top: 12px;" @click="next1">
      下一步
    </c-button>
    <h3>带描述信息</h3>
    <c-steps align-center :active="active2" finish-status="success">
      <c-step title="步骤一" description="这是一段很长很长很长的描述性文字" />
      <c-step title="步骤二" description="这是一段很长很长很长的描述性文字" />
      <c-step title="步骤三" description="这是一段很长很长很长的描述性文字" />
    </c-steps>
    <c-button style="margin-top: 12px;" @click="next2">
      下一步
    </c-button>
    <h3>样式二</h3>
    <div style="margin-bottom: 20px;">
      tips: 需要修改源码，添加属性 line才能生效展示效果
    </div>
    <c-steps
      :active="active3"
      finish-status="success"
      line
    >
      <c-step title="步骤 1" />
      <c-step title="步骤 2" />
      <c-step title="步骤 3" />
    </c-steps>
    <c-button style="margin-top: 12px;" @click="next3">
      下一步
    </c-button>
  </div>
</template>
<script>
export default {
  name: 'Steps',
  data () {
    return {
      active: 0,
      active1: 0,
      active2: 0,
      active3: 0,
      processStatus: 'error'
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    },
    next1 () {
      if (this.active1++ > 2) this.active1 = 0
    },
    next2 () {
      if (this.active2++ > 2) this.active2 = 0
    },
    next3 () {
      if (this.active3++ > 2) this.active3 = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.steps{
  padding: 20px;

}
</style>
