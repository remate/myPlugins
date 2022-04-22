<template>
  <button @click="btn($event)">text:{{ text }}</button>
  <hello class="classes" name="names" @hellos="hellos">
    <template #header="slotProps">
      headers here {{ slotProps.title }}
    </template>
    haha
  </hello>
  <input type="text" v-model.trim="text">
  <div>{{ pluss() }}</div>
</template>
<script setup>
import { ref, reactive, nextTick, onMounted, watch, provide, readonly } from 'vue';
import hello from './components/HelloWorld.vue'
let text = ref(1)
function btn(event) {
  console.log(text.value)
}
function hellos(data) {
  console.log(data)
}

</script>
<style>
</style>
