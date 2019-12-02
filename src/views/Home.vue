<template>
  <div id="home">
    <van-sticky>
      <div class="header">
        <van-nav-bar title="Music">
          <van-icon name="search" slot="right" @click="searchHandle" class="search" />
        </van-nav-bar>
      </div>
      <div class="navList" ref="container">
        <van-sticky :container="container">
          <van-tabs v-model="active" v-show="!flag">
            <van-tab title="新歌" :to="{name:'NewMusic',query:{active:0}}"></van-tab>
            <van-tab title="排行" :to="{name:'RankingList',query:{active:1}}"></van-tab>
            <van-tab title="歌单" :to="{name:'SongList',query:{active:2}}"></van-tab>
            <van-tab title="歌手" :to="{name:'Singer',query:{active:3}}"></van-tab>
          </van-tabs>
          <van-nav-bar v-show="flag" title="搜索" left-text left-arrow @click-left="index" />
        </van-sticky>
      </div>
    </van-sticky>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: null,
      active: 0,
      flag: false
    };
  },
  mounted() {
    this.container = this.$refs.container;
  },
  methods: {
    searchHandle() {
      this.flag = true;
      this.$router.push({ path: "/Search" });
    },
    index() {
      this.flag = false;
      this.active = 0;
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
.search {
  font-size: 20px;
}
.navList {
  overflow: auto;
}
</style>
