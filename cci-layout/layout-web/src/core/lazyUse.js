import Vue from 'vue'
// 组件懒加载，这里导入单个引用的组件
import { Menu, Avatar } from '@cci/cui'
import CollapseTransition from '@cci/cui/lib/transitions/collapse-transition'

Vue.component(Menu.name, Menu)
Vue.component(Avatar.name, Avatar)
Vue.component(CollapseTransition.name, CollapseTransition)
