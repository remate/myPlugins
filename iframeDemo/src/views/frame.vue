<template>
  <h1 @click="jump">frame</h1>
</template>

<script>
export default {
  name: "frame",
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
