<template>
  <transition name="el-fade-in-linear">
    <div v-show="drawerShow" :style="wapperStyle" class="drawer-comp-wapper">
      <div class="modal" :style="modalStyle">
        <transition name="collapse">
          <div v-show="drawerShow" class="container" :style="containerStyle">
            <!-- 头部 -->
            <div v-if="!clearWind" class="drawer-header">
              <slot name="drawerHeader">
                <div class="title">
                  {{title}}
                </div>
              </slot>
              <slot name="drawerHeaderBtn" />
              <div v-if="showClose" class="close" @click="$emit('update:drawerShow', false)">
                <i class="el-icon-close" />
              </div>
            </div>
            <!-- 主体内容 -->
            <div class="drawer-content" :style="clearWind ? null : drawerContent">
              <slot>请添加内容！</slot>
            </div>
            <!-- 底部 -->
            <div v-if="!clearWind && showFooter" class="drawer-footer">
              <slot name="drawerFooter">
                <div class="footer-btn">
                  <c-button @click="$emit('update:drawerShow', false)">
                    取消
                  </c-button>
                  <c-button type="primary" @click="$emit('submit')">
                    提交
                  </c-button>
                </div>
              </slot>
            </div>
            <!-- 侧边按钮 -->
            <div class="drawer-expand" @click="$emit('update:drawerShow', false)">
              <span class="drawer-expand-text">收起</span>
              <i class="el-icon-caret-right" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
const options = {
  mini: '334px',
  small: '608px',
  medium: '1070px'
}

const props = defineProps({
  clearWind: {
    type: Boolean,
    default: false
  },
  // 是否显示遮罩层 :drawerShow.sync="" 需加 .sync 修饰符
  drawerShow: {
    type: Boolean,
    default: () => false
  },
  // 是否显示抽屉
  modelShow: {
    type: Boolean,
    default: () => true
  },
  /** 抽屉大小
     *
     * mini 334px
     * small 608px
     * medium 1070px
     * 自定义宽度字符
     * 500px
     * 50%
     */
  size: {
    type: String,
    default: () => 'small'
  },
  // 抽屉标题
  title: {
    type: String,
    default: () => '标题'
  },
  // 是否需要头部
  showHeader: {
    type: Boolean,
    default: () => true
  },
  // 是否需要底部
  showFooter: {
    type: Boolean,
    default: () => false
  },
  // 是否需要关闭按钮
  showClose: {
    type: Boolean,
    default: () => false
  },
  // 抽屉层级
  zIndex: {
    type: Number,
    default: () => 10
  }
})

const modalSize = computed(() => options[props.size] || props.size)
console.log(modalSize)
const wapperStyle = computed(() => {
  console.log(modalSize)
  return {
    width: props.modelShow ? '100%' : modalSize.value,
    height: '100%',
    top: 0,
    zIndex: props.zIndex
  }
})
const modalStyle = computed(() => {
  return {
    width: props.modelShow ? '100%' : modalSize.value,
    height: '100%',
    backgroundColor: props.modelShow ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
  }
})
const containerStyle = computed(() => {
  return {
    width: modalSize.value,
    top: 0
  }
})
const drawerContent = computed(() => {
  const headerHeight = props.showHeader ? '32px' : '0px'
  const footerHeight = props.showFooter ? '64px' : '0px'
  return {
    height: `calc(100% - ${headerHeight} - ${footerHeight})`
  }
})
</script>

<style scoped lang="scss">
  .drawer-comp-wapper {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;

    .container {
      // height: calc(100vh - 64px);
      height: 100%;
      background-color: #fff;
      padding: 20px 24px;
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: -2px 0px 12px 0px rgba(0, 0, 0, 0.09);
      box-sizing: border-box;
      .drawer-header {
        font-size: 18px;
        line-height: 32px;
        display: flex;
        .title {
          flex: 1;
        }
        .title,
        .close {
          font-size: 18px;
          color: #333;
          font-weight: 550 !important;
          line-height: 32px;
          cursor: pointer;
        }
        .close {
          color: #999999;
          margin-left: 12px;
          .el-icon-close:before {
            font-weight: 600;
            font-size: 22px;
            line-height: 32px;
          }
        }
      }
      .drawer-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: #ededed;
        }
        &::-webkit-scrollbar-track {
          display: none;
        }
      }

      .drawer-header {
        margin-bottom: 12px;
      }
      .drawer-footer {
        padding-right: 24px;
        position: absolute;
        width: 100%;
        height: 64px;
        box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.06);
        .footer-btn {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          .el-button {
            margin-left: 8px;
          }
        }
      }
      .drawer-expand {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 42px;
        left: -32px;
        background: #ffffff;
        border-radius: 8px 0px 0px 8px;
        box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &-text {
          display: inline-block;
          width: 12px;
          font-size: 12px;
          line-height: 14px;
        }
        i {
          font-size: 20px;
          width: 10px;
          position: relative;
          top: -4px;
          left: -4px;
        }
      }
    }
  }
  </style>

  <style lang="scss">
  // 渐入渐出
  .fade-enter-active {
    transition: opacity 0.5s;
  }
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  // 折叠
  .collapse-enter-active {
    transition: all 0.5s;
  }
  .collapse-leave-active {
    transition: all 1s;
  }
  .collapse-enter {
    transform: translateX(100%);
  }
  .collapse-leave-to {
    transform: translateX(200%);
  }
  </style>
