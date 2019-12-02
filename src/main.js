import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import axios from 'axios'
import VueJsonp from 'vue-jsonp'
import 'vant/lib/index.css';
import { Switch } from 'vant';

Vue.use(VueJsonp)
Vue.use(Switch);
Vue.use(Vant);

Vue.prototype.$axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
