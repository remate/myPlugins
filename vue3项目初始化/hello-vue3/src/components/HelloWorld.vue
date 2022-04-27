<template>
  <h2 :name="$attrs.name">attrs</h2>
  <h2 @click="emitTest">asd</h2>
  <slot name="default"></slot>
  <slot name="header" :title="title"></slot>
  <button @click="updateLocation">{{ location }}</button>
 <input type="text" v-focus>
</template>

<script setup>
import { useAttrs, inject } from "vue";
const title = '这是标题'
const attrs = useAttrs()
console.log('attrs', attrs)
const emit = defineEmits(['hellos'])
function emitTest() {
  emit('hellos', 99)
}
const vFocus = {
  mounted: (el) => el.focus()
}

</script>
<style scoped>
</style>
