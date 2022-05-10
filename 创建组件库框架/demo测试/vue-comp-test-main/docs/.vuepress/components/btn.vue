<template>
  <div class="btn" @click="cc">
    haha
  </div>
</template>

<script>
export default {
  name: 'btn',
  methods:{
    cc(){
      alert(1)
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  width:60px;
  height: 20px;
  background: red;
}
</style>
