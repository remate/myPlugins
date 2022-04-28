<template>
  <h2>{{ foo+1 }}</h2>

</template>

<script setup>
import { reactive, ref } from "vue";
const object = { foo: ref(1) }
const {foo} = object
</script>
<style scoped>
</style>
