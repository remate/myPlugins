<template>
  <div>
     <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
  </div>

</template>

<script>
export default {
  name: 'btn',
  methods: {
    cc() {
      alert(1)
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  width: 60px;
  height: 20px;
  background: red;
}
</style>
