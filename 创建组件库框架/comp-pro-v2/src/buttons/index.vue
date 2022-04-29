<template>
  <button class="buttons" @click="handle">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'buttons',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary',
    },
  },
  methods:{
    handle(e){
      alert(e.target.innerHTML)
    }
  }
};
</script>

<style lang="scss">
.buttons {
  min-width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 30px;
  margin: 10px 0;
}
</style>
