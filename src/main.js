import Vue from 'vue'
import App from './App.vue'
import VueScreenSize from 'vue-screen-size'
import '@/services/filter'
import '@/assets/main.scss'

Vue.use(VueScreenSize)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
