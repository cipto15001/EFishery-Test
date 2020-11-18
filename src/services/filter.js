import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format(' DD/MM/YYYY hh:mm:ss')
  } else {
    return ''
  }
})

Vue.filter('formatMoney', function (value) {
  if (value) {
    let val = (value / 1).toFixed(2).replace('.', ',')
    return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  } else {
    return 'No Data'
  }
})

Vue.filter('capitalizeEach', function (value) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  if (value) {
    return value.split(' ').map(capitalize).join(' ')
  }
})

Vue.filter('chunkString', function (value) {
  if (value) {
    const string = value.match(new RegExp('.{1,' + 15 + '}', 'g'))
    return string[0]
  }
})
