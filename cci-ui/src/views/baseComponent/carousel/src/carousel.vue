<template>
  <div class="carousel">
    <c-carousel height="150px">
      <c-carousel-item v-for="item in 4" :key="item" />
    </c-carousel>
    <div style="margin-top: 20px">
      <c-tooltip
        content="bottom center"
        placement="bottom"
      >
        <c-button>
          气泡提示
        </c-button>
      </c-tooltip>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Carousel',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.carousel{
  padding: 20px;
}
.el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

</style>
