<template>
  <div style="height: 100%">
    <cm-admin-layout>
      <template v-slot:aside-menu-icon="{menu}">
        <svg-icon
          :iconClass="menu.icon"
          v-if="menu.icon"
          class="menu-icon menu-item-svg"
        />
      </template>

      <template v-slot:aside-menu-content="{menu}">
        <span :class="menu.icon?'menu-title':''">{{ menu.meta.title }}</span>
        <span
          v-if="menu.meta.pop"
          class="menu-tag menu-tag--danger"
        >
          {{ menu.meta.pop || 0 }}
        </span>
      </template>
    </cm-admin-layout>
  </div>
</template>

<script>
import CmAdminLayout, { appMutations, headerMutations, asideMutations, pageMutations } from '@cci/cm-admin-layout'

// 设置一些基础信息
appMutations.title('cm-admin-layout')
appMutations.logo(require('../assets/img/logo.png'))
headerMutations.theme('cci')
headerMutations.avatar(require('../assets/img/head.png'))
asideMutations.theme('light')
asideMutations.switchTransitionName('')
pageMutations.httpPrefix('/JUMP/')

export default {
  name: 'Layout',

  components: {
    CmAdminLayout
  },

  computed: {
    userName() {
      return this.$store.getters.userData.userName || '**'
    }
  },

  created() {
    headerMutations.username(this.userName)

    // 针对海林科的跳转
    pageMutations.httpBeforeJumpFunc(url => {
      return url.slice(6)
    })

    // 设置退出登陆的操作
    headerMutations.logout(() => {
      this.logout()
    })

    // appMutations.modifyMenuMeta('/province-case', {
    //   pop: 29
    // })
  },

  methods: {
    async logout() {
      const url = await this.$store.dispatch('Logout')
      await this.$store.dispatch('RemoveRoutes')
      // window.location.href = `${process.env.VUE_APP_NAVIGATION_URL}`
      window.location.href = url
    }
  }
}
</script>

<style lang="scss">
@import "~@cci/cm-admin-layout-theme/src/index.scss";

.menu-item-svg {
  width: 16px;
  height: 14px;
}

.cm-admin-layout {
  .el-menu-item {
    .menu-title {
      margin-left: 8px;
    }
  }

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
