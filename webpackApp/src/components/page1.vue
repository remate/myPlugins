<template>
  <div>
    <h2 @click="start">page1</h2>
    <h2 @click="close">关闭</h2>
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
  methods: {
    start() {
      this.$socket.emit("hello", "random"); //发送消息
    },
    close() {
      this.sockets.unsubscribe("hello"); //取消订阅
      this.$socket.close(); //关闭连接
    },
  },
  mounted() {
    new Taps();
    this.$socket.open(); //开始连接
    this.sockets.subscribe("hello", (res) => {
      //订阅消息
      // if (res.code == 200 && res.randomId === this.randomId) {
      console.log("返回消息", res);
      // }
    });
  },
};
</script>
<style lang="scss" scoped>
#app {
}
</style>
