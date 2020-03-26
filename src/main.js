import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store/store'

import Toast from './components/toast/index'

Vue.use(Toast)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


import 'amfe-flexible'

import fastclick from 'fastclick'

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
