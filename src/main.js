import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant组建库，全局注册vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.config.productionTip = false

//用于动态设置rem基准值
import 'amfe-flexible'

//加载全局样式
import './styles/index.less'

// 使用dayjs
import './utils/dayjs.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
