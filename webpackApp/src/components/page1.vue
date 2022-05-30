<template>
  <div>
    <h2>page1</h2>
  </div>
</template>
<script>
import Taps from "./tapableindex";
export default {
  name: "page1",
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
  mounted() {
    let taps = new Taps()
  },
};
</script>
<style lang="scss" scoped>
#app {
}
</style>
