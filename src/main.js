import Vue from 'vue'
import App from './App.vue'

import './style/index.less'
import router from './router/index'
import store from './store/'
import './core/use'
import './permissions'

Vue.config.productionTip = false

import * as filters from './filters'

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters)[key])
})

new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
