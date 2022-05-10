import Vue from 'vue';
import App from './App.vue';
// 批量注册组件
import testComp from '../packages';
import '../packages/theme/index.scss';
Vue.use(testComp);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
