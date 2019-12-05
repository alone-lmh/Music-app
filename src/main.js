import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
// import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

import {
  Switch
} from 'vant';

Vue.use(Switch);
Vue.use(Vant);
Vue.use(Vuex);

Vue.prototype.$axios = axios
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')