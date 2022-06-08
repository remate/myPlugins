<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module
    replacement.<i>haha</i>
  </p>
  <selectBtnList />
  <van-button type="success">成功按钮</van-button>
  <SvgIcon name="xyxxcj"></SvgIcon>
</template>

<script>
import selectBtnList from "components/selectBtnList";
export default {
  name: "HelloWorld",
  components: {
    selectBtnList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
i {
  color: $default-color;
}
</style>
