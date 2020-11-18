import Vue from 'vue'
import App from './App.vue'
import VueScreenSize from 'vue-screen-size'
import money from 'v-money'
import '@/services/filter'
import '@/assets/main.scss'

Vue.use(VueScreenSize)
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'Rp ',
  precision: 0,
  masked: false,
})
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
