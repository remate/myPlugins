<template>
  <div>
    {{homeName}}
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {};
  },
  provide() {
    return {
      app: this,
    };
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
#app {
}
</style>
