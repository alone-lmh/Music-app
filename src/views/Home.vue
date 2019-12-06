<template>
  <div id="home">
    <div id="header">
      <van-nav-bar title="Music">
        <van-icon name="search" slot="right" @click="searchHandle" class="search" />
      </van-nav-bar>
    </div>
    <div id="content">
      <div class="navList" ref="container">
        <van-tabs v-model="active" v-show="flag">
          <van-tab title="新歌">
            <NewMusic></NewMusic>
          </van-tab>
          <van-tab title="排行">
            <RankingList></RankingList>
          </van-tab>
          <van-tab title="歌单">
            <SongList></SongList>
          </van-tab>
          <van-tab title="歌手">
            <Singer></Singer>
          </van-tab>
        </van-tabs>
        <van-nav-bar v-show="!flag" title="搜索" left-text left-arrow @click-left="index" />
      </div>
      <Search v-show="!flag"></Search>
    </div>
  </div>
</template>

<script>
import NewMusic from "./NewMusic.vue";
import RankingList from "./RankingList.vue";
import SongList from "./SongList.vue";
import Singer from "./Singer.vue";
import Search from "./Search.vue";

export default {
  data() {
    return {
      container: null,
      active: 0,
      flag: true
    };
  },
  mounted() {
    this.flag = localStorage.getItem("flag") == "false" ? false : true;
    this.container = this.$refs.container;
  },
  components: {
    NewMusic,
    RankingList,
    SongList,
    Singer,
    Search
  },
  methods: {
    searchHandle() {
      this.flag = false;
    },
    index() {
      this.flag = true;
      this.active = 0;
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
#header {
  height: 46px;
}
#content {
  flex: 1;
  overflow: auto;
}
.van-tabs[data-v-fae5bece] {
  position: relative;
  padding-top: 44px;
}

.search {
  font-size: 20px;
}
.van-nav-bar{position:fixed;width:100%;}
.iptSearch{padding-top:44px;}
.hotSearch{padding-top:54px;}
.van-sticky--fixed {
  background: #fff;
}
</style>
