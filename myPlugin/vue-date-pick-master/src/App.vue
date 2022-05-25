<template>
  <div id="app">
    <datePicker :dates="dates" ref="datePicker" @callBack="callBack"></datePicker>
    <div class="change" @click="changeDate">修改时间</div>
  </div>
</template>

<script>
import datePicker from './components/date-picker'

export default {
  name: 'app',
  data () {
    return {
      dates:{
        startDate:'2021-11-1',
        endDate:'2021-11-30'
      }
    }
  },
  methods: {
    changeDate(){
      this.dates={
        startDate:'2021-12-1',
        endDate:'2021-12-31'
      }
    },
    callBack(data){
      console.log('最终数据,切换后未重置之前数据数组',data)
    }
  },
  components: {
    datePicker
  }
}
</script>

<style lang="less" scoped>
  .change{
    color: red;
  }

</style>
