import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Lazyload
} from 'vant';


Vue.use(VueRouter);
Vue.use(Lazyload);

const routes = [{
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/Reg',
    name: 'Reg',
    redirect: '/Reg/verify',
    component: () => import('../views/Reg.vue'),
    children: [{
      path: 'verify',
      name: 'verify',
      component: () => import('../components/reg/verify.vue')
    }, {
      path: 'login',
      name: 'login',
      component: () => import('../components/reg/login.vue')
    }, {
      path: 'bsgMsg',
      name: 'bsgMsg',
      component: () => import('../components/reg/bsgMsg.vue')
    }]
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/NewMusic',
    component: () => import('../views/Home.vue'),
    children: [{
        path: '/NewMusic',
        name: 'NewMusic',
        component: () => import('../views/NewMusic.vue')
      },
      {
        path: '/RankingList',
        name: 'RankingList',
        component: () => import('../views/RankingList.vue')
      },
      {
        path: '/SongList',
        name: 'SongList',
        component: () => import('../views/SongList.vue')
      },
      {
        path: '/Singer',
        name: 'Singer',
        component: () => import('../views/Singer.vue')
      },
      {
        path: '/Search',
        name: 'Search',
        component: () => import('../views/Search.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router