<template>
  <div class="textInfoWrap">
    <div
      v-for="(item, index) in dataArr"
      :key="index"
      class="iconTextLine"
      :class="item.inline ? 'inline' : 'block'"
    >
      <div
        class="title"
        :class="titleBold ? 'titleBold' : ''"
        :style="{
          fontSize: fontSize + 'px',
          width: titleWidth + 'px',
          justifyContent: titleAlign,
          marginRight: distance + 'px',
        }"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          :style="{ width: iconWidth + 'px' }"
        />
        {{ item.title }}
      </div>
      <div
        class="value"
        v-html="item.value"
        :class="item.class ? item.class : ''"
        :style="{
          fontSize: fontSize + 'px',
          textAlign: valueAlign,
          paddingRight: item.arrow ? '20px' : 0,
        }"
      ></div>
      <!-- <span v-if="item.arrow" class="text-arrow">></span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'text-list',
  props: {
    dataArr: {
      type: Array,
      default() {
        return [
          //需要自动换行的  单一文字的要写在value
          {
            // icon: 'https://img.yzcdn.cn/vant/logo.png',
            title: '违章建筑',
            value: '2000m³',
            // arrow: true,
            // inline: false,
          },
          {
            // icon: 'https://img.yzcdn.cn/vant/logo.png',
            title: '出土面积',
            value: '2000m³',
          },
          {
            // icon: 'https://img.yzcdn.cn/vant/logo.png',
            title: '地址',
            value: '萧山区经济技术开发区某某路198号A-B102-1282室',
          },
          {
            // icon: 'https://img.yzcdn.cn/vant/logo.png',
            title: '镇街',
            value:
              '萧山区经济技术开发区某某路198号A萧山区经济技术开发区某某路198号A萧山区经济技术开发区某某路198号A萧山区经济技术开发区某某路198号A',
          },
        ];
      },
    },
    titleBold: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: [String, Number],
      default: 20,
    },
    titleWidth: {
      type: [String, Number],
      default: 120,
    },
    iconWidth: {
      type: [String, Number],
      default: 20,
    },
    distance: {
      type: [String, Number],
      default: 20,
    },
    valueAlign: {
      type: String,
      default: 'left',
    },
    titleAlign: {
      type: String,
      default: 'flex-end',
    },
  },
};
</script>
<style scoped lang="scss">
.textInfoWrap {
  .iconTextLine {
    // position: relative;
    margin: 0 0 8px 0;
    flex-direction: row;
    align-items: flex-start;
    // .text-arrow {
    //   position: absolute;
    //   top: 50%;
    //   right: 5px;
    //   transform: translateY(-50%);
    //   color: #a7a6a6;
    // }
    &:last-child {
      margin-bottom: 0;
    }
    &.inline {
      width: 50%;
      display: inline-flex;
    }

    &.block {
      display: flex;
    }

    img {
      margin: 0 5px 0 0;
      display: inline-block;
    }

    .title {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      &.titleBold {
        font-weight: 600;
      }
    }

    .value {
      flex: 1;
      font-size: 12px;
      display: inline-block;
      margin-right: 6px;
      color: rgba(113, 110, 110, 0.65);
      &.red {
        color: #d93026;
      }
      &.green {
        color: #2fc25b;
      }
    }
  }
}
</style>
