import Vue from 'vue'
// 组件懒加载，这里导入单个引用的组件
import { Menu, Avatar } from 'element-ui'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.component(Menu.name, Menu)
Vue.component(Avatar.name, Avatar)
Vue.component(CollapseTransition.name, CollapseTransition)
