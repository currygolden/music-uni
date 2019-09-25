import Vue from 'vue'
import App from './App'
import PubFuc from'./publicjs/common'
// 路由信息在pages.json中
Vue.config.productionTip = false
Vue.prototype.$pubFuc = PubFuc


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
