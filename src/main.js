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

const store = new Vuex.Store({
  state: {
    count:localStorage.getItem('count')|| 0,
    regCount:localStorage.getItem('regCount')|| 0
  },
  //如果想要改变vuex中的数据，需要定义一个对象叫mutations
  mutations: {
    //state表示当前的state的数据
    //payload表示载荷（也就是传递的参数）
    changeNavCount(state, payload) {
      state.count=payload.num;
      localStorage.setItem('count', payload.num)
    },
    changeRegCount(state, payload){
      state.regCount=payload.number;
      localStorage.setItem('regCount', payload.number)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')