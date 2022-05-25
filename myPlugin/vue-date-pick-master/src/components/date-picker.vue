<template>
  <div class="calender">
    <div class="month-list">
      <div class="month">
        <div class="title">
          <div v-for="(item) in weekArr" :key="item">{{item}}</div>
        </div>
        <div class="day-line" v-for="(week, index) in dateData[0].month" :key="index">
          <div
            class="day"
            @click.stop.prevent="clickHandler($event)"
            v-for="day in week"
            :key="day.date"
            :data-text="day.tips"
            :data-date="day.date"
            :data-disabled="day.disable"
            :data-ii="day.date"
            :class="{
              hide:!day.text,
              disable: day.disable,
              today: day.alias === '今天',
              selected: selected.indexOf(day.date)>-1
            }">
              <div class="day-item" :data-text="day.tips">
                <p>{{day.text}}</p>
              </div>
              <div class="day-bg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './utils.js';
import { getRecentDay, compare } from './holiday';
export default {
  name: 'calender',
  props: {
    // 日期范围开始
    dates: {
      type: Object,
      default(){
        return {}
      }
    },

  },
  watch:{
    dates:{
      handler(NEW){
        this.startDate = NEW.startDate
        this.endDate = NEW.endDate
        this.init()
      },
      immediate:true
    }
  },
  data () {
    return {
      dateData:[],
      startDate:'',
      endDate:'',
      weekArr: ['周日','周一', '周二', '周三', '周四', '周五', '周六'],
      selected:[], // 选中
      compare // 比较转化
    }
  },
  methods: {
    selectedTime(a) {
      return new Date(a).format('yyyy/MM/dd');
    },
    // 初始化日期转化 -/ 补0~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    transfer(date) {
      return new Date(date.replace(/-/g, '/')).format('yyyy/MM/dd')
    },
    // 创建日期月份数据
    buildMonthDate(time) {
      let monthDate = [];
      let month = time.getMonth();
      let date = new Date(time);
      var t = time.getDay() === 0 ? 6 : time.getDay() - 1;
      let dateList = new Array(t+1).fill('');///周日在最后则为t，不为t+1
      // console.log('dateList',dateList)
      while (date.getMonth() === month) {
        let dateInfo = {};
        if (dateList.length === 7) {
          // console.log('dateList.length',7)
          monthDate.push(dateList);
          dateList = [];
        }
        dateInfo = {
          text: date.getDate(),
          dateTime: date.getTime(),
          date: date.format('yyyy/MM/dd'),
          tips: ''
        }
        // 开始日期之前和结束日期之后的日期置灰
        if (date.getTime() < new Date(this.startDate).getTime() || date.getTime() > new Date(this.endDate).getTime()) {
          // console.log('<')
          dateInfo.disable = true;
        }
        // 最近日期处理  今天明天 后天
        let recentDay = getRecentDay(date);
        if (recentDay) {
          dateInfo.alias = recentDay;
        }
        dateList.push(dateInfo);
        date.addDays(1);
      }

      // 不满7 补充完整
      if (dateList.length) {
        for (let i = dateList.length; i < 7; i++) {
          dateList.push('');
        }
        monthDate.push(dateList);
        dateList = null;
      }
      return {
        month: monthDate,
        title: `${time.getFullYear()}年${time.getMonth() + 1}月`,
        monthId: `${time.getFullYear()}${time.getMonth() + 1}`
      };
    },/////////////
    // 创建日期数据
    buildData() {
      let startDate = compare(this.startDate);
      let endDate = compare(this.endDate);
      let dateData = [];
      while (startDate <= endDate) {
        let month = this.buildMonthDate(startDate.firstDayOfMonth());
        dateData.push(month);
        startDate.addMonths(1);
      }
      return dateData;
    },    /////////////
    // 点击事件处理
    clickHandler(e) {
      if (e.currentTarget.dataset.disabled) return;
      let date = e.currentTarget.dataset.date;
      if(this.selected.indexOf(this.selectedTime(new Date(date)))>-1){
        let index = this.selected.indexOf(this.selectedTime(new Date(date)))
        this.selected.splice(index,1)
      } else {
        this.selected.push(this.selectedTime(new Date(date)));
      }
      this.$emit('callBack',this.selected)
    },
    init(){
      this.dateData = this.buildData();
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
  .calender {
    width: 600px;
    background-color: #eee;
    z-index: 1000;

    &.calendar-top {
      padding-top: 34px;
    }

    .month {
      overflow: hidden;
      &:first-child {
        margin: 0;
      }

      h1 {
        width: 100%;
        font-size: 16px;
        margin: 20px 0;
        text-align: center;
        color: #333;
        font-weight: 500;
      }

      .title {
        display: flex;
        padding: 0 8px;
        background-color: #eee;
        margin-bottom: 8px;

        div {
          flex: 1;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          vertical-align: middle;
          color: #222;

          &.weekend {
            color: #18b4ed;
          }
        }
      }

      .day-line {
        display: flex;
        padding: 0;
        margin-bottom: 4px;
        .day {
          flex: 1;
          width: 12%;
          height: 50px;
          font-size: 14px;
          font-weight: 500;
          background: #eee;
          text-align: center;
          color: #333;
          position: relative;
          .day-item {
            width: 40px;
            height: 40px;
            //padding-top: 8px;
            margin: 0 auto;
            z-index: 2;
            position: relative;
            font-size: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
              margin: 0;
            }
          }

          .day-bg {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
            background: #d3e3fe;
            opacity: 0;
          }

          &.hide {
            visibility: hidden;
          }

          &.disable {
            color: #ccc;
          }


          &.today {
            .day-item {
              background: #e7e7e7;
              border-radius: 50%;
            }
          }
          &.range {
            border-radius: 10px 0 0 10px;
            .day-bg {
              opacity: 1;
            }
            .day-item {
              background: #d3e3fe;
            }

          }

          &.selected {
            .day-item {
              position: relative;
              background: #18b4ed;
              border-radius: 50%;
              &::after{
                position: absolute;
                bottom: -5px;
                right: -5px;
                content: 'x';
                width: 16px;
                heihgt: 16px;
                border-radius: 50%;
                background: lawngreen;
                border: 1px solid #fff;
              }
            }
            color: #fff;
          }
          &.left{
            .day-bg {
              left: 50%;
            }
          }
        }
        .work {
          .day-item:before {
            content: attr(data-text);
            position: absolute;
            font-size: 10px;
            right: -2px;
            color: #333;
            top: -1px;
          }
        }
        .relax {
          .day-item:before {
            content: attr(data-text);
            position: absolute;
            font-size: 10px;
            right: 1px;
            color: #5b88d4;
            top: -1px;
          }
        }
      }
    }
  }
</style>
