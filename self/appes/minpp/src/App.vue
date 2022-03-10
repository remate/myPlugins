<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import to from 'await-to-js';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  async mounted() {
    let p = Promise.reject({
      a:12
    })
    let [userErr, info] = await to(p,{err:true})
    console.log(userErr)
    console.log(info)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
