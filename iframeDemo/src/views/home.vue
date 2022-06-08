<template>
  <h1 @click="jump">homepage</h1>
  <iframe
    class="myFrame"
    frameborder="0"
    src="http://localhost:8081/#/frame"
  ></iframe>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    jump() {
      this.$router.push("/names");
    },
  },
};
</script>
<style lang="scss" scoped>
.myFrame {
  width: 100%;
  height: 500px;
}
i {
  color: $default-color;
}
</style>
