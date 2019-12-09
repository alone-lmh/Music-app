<template>
  <div id="home">
    <div id="header">
      <van-nav-bar title="Music">
        <van-icon name="bars" slot="left" class="user" @click="personal=true" />
        <van-icon name="search" slot="right" @click="searchHandle" class="search" />
      </van-nav-bar>
    </div>
    <div id="content">
      <div class="navList" ref="container">
        <van-tabs v-model="active" v-show="flag" swipeable replace>
          <van-tab title="新歌">
            <NewMusic @to-parent="getMusicId"></NewMusic>
          </van-tab>
          <van-tab title="排行">
            <RankingList @to-parent="getMusicId"></RankingList>
          </van-tab>
          <van-tab title="歌单">
            <SongList @to-parent="getMusicId"></SongList>
          </van-tab>
          <van-tab title="歌手">
            <Singer @to-parent="getMusicId"></Singer>
          </van-tab>
        </van-tabs>
        <van-nav-bar v-show="!flag" title="搜索" left-text left-arrow @click-left="index" />
        <Search v-show="!flag" @to-parent="getMusicId"></Search>
        <listening v-if="listenFlag" :key="getId" :musicId="getId"></listening>
      </div>
    </div>
    <van-popup
      v-model="personal"
      position="left"
      get-container="body"
      :style="{ width: '60%',height:'100%' }"
    >
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="logOut">退出登录</van-tabbar-item>
      </van-tabbar>
    </van-popup>
  </div>
</template>

<script>
import listening from "../components/playMusic/index.vue";
import NewMusic from "./NewMusic.vue";
import RankingList from "./RankingList.vue";
import SongList from "./SongList.vue";
import Singer from "./Singer.vue";
import Search from "./Search.vue";
import { relative } from "path";
//flag:用于进行导航栏和搜索栏的切换   getId用于记录子组件向父组件提交的音乐ID
//listenFlag用于显示音乐播放器    personal用于显示个人中心
export default {
  data() {
    return {
      container: null,
      active: 0,
      flag: true,
      getId: "",
      listenFlag: false,
      personal: false
    };
  },
  mounted() {
    this.container = this.$refs.container;
  },
  components: {
    NewMusic,
    RankingList,
    SongList,
    Singer,
    Search,
    listening
  },
  methods: {
    searchHandle() {
      this.flag = false;
    },
    index() {
      this.flag = true;
      this.active = 0;
    },
    getMusicId(i) {
      this.getId = i;
      this.listenFlag = true;
      setTimeout(() => {
        document.getElementById("listening").style.position = "static";
        document.getElementById("listening").style.height = "auto";
        document.getElementById("top").style.height = 0;
      });
    },
    logOut() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      this.$router.push({ path: "/Login" });
    }
  }
};
</script>
<style scoped>
#home {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#content {
  flex: 1;
  overflow: auto;
}
.navList {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-tabs[data-v-fae5bece] {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search,
.user {
  font-size: 1.5em;
}

.van-sticky--fixed {
  background: #fff;
}
</style>
