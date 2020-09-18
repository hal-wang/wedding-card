import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/styles/index.scss'
import '@/icons'

import animated from 'animate.css'
Vue.use(animated)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '我们结婚啦'
  next()
})

import post from '@/utils/request'
Vue.prototype.post = post

post('people', 'get')
  .then(res => {
    store.dispatch('setPeople', res.data)

    new Vue({
      el: '#app',
      store,
      router,
      render: h => h(App)
    })
  })
  .catch(error => {
    console.log('get config error...' + error)
  })
