<template>
  <button @click="btn($event)">text</button>
  <hello class="classes" name="names"></hello>
  <div>{{ msg }}</div>
</template>
<script setup>
import { onMounted } from 'vue';
import hello from './components/HelloWorld.vue'
function btn() {

}
</script>
<style>
</style>
