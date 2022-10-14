<template>
  <div style="height: 100%">
    <!-- class="layout-mode1" -->
    <cp-frame-layout v-if="useLayout">
      <template #aside-menu-icon="{ menu }">
        <SvgIcon :icon-class="menu.icon || 'icon'" class="menu-icon menu-item-svg" />
      </template>

      <template #aside-menu-content="{ menu }">
        <span>{{menu.meta.title}}</span>
        <!-- 数字气泡 -->
        <span v-if="menu.meta.pop" class="menu-tag menu-tag--danger">
          {{menu.meta.pop || 0}}
        </span>
      </template>
    </cp-frame-layout>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import { useLayout } from '@/utils'
import CpFrameLayout, {
  appMutations,
  headerMutations,
  asideMutations,
  pageMutations,
  tagsViewMutations
} from '@cci/cp-frame-layout'
// 设置一些基础信息
appMutations.title('CCI-Admin')
appMutations.logo(require('../assets/images/logo.png'))
headerMutations.theme('cci')
asideMutations.theme('cci')
headerMutations.avatar(require('../assets/images/head.png'))
asideMutations.switchTransitionName('')

const isDev = process.env.VUE_APP_ENV === 'development'
tagsViewMutations.enableCache(isDev)

// 菜单左右布局
// appMutations.navMode('head')

// 框架左右布局
// appMutations.struct('left-right')

export default {
  name: 'LayoutS',
  components: {
    CpFrameLayout
  },
  data () {
    return {
      useLayout
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userData.userName || '管理员'
    }
  },
  watch: {
    $route: {
      handler () {
        const path = this.$route.path
        if (path === '/404') {
          pageMutations.showHeader(false)
          tagsViewMutations.enabled(false)
        }
      },
      immediate: true
    }
  },

  created () {
    // 用户信息
    headerMutations.username(this.userName)
    // 退出操作
    headerMutations.dropdownItems([
      // {
      //   icon: 'el-icon-switch-button',
      //   content: '退出登录',
      //   handler: this.logout
      // }
    ])
    headerMutations.logout(() => {
      this.$message.success('退出成功')
    })
  },
  methods: {
    async logout () {
      // 请自定义退出操作
      const url = await this.$store.dispatch('Logout')
      await this.$store.dispatch('RemoveRoutes')
      window.location.href = url
    }
  }
}
</script>

<style lang="scss">
@import '~@cci/cp-frame-layout-theme/src/index.scss';

.menu-item-svg {
  width: 16px;
  height: 14px;
}

.menu-tag {
  position: absolute;
  top: calc(50% - 8px);
  padding: 0 5px;
  font-size: $--font-size-extra-small;
  line-height: $--font-size-extra-small;
  border-radius: 8px;
  height: 16px;
  line-height: 16px;
  text-align: center;

  &--danger {
    color: $--color-white;
    background-color: $--color-danger;
  }
}

//对menu-tag的right的一些设置
.el-menu {
  &--vertical {
    .el-menu-item > .menu-tag {
      //right: $menu-padding;
      right: $menu-padding + 14px;
    }

    .el-submenu__title > .menu-tag {
      right: $menu-padding + 14px;
    }
  }

  &--horizontal {
    .el-menu-item > .menu-tag {
      right: 10px;
    }

    .el-submenu__title > .menu-tag {
      right: 10px + 12px;
    }
  }
}
</style>
