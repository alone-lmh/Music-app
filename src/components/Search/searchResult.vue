<template>
  <div class="searchResult">
    <div style="text-align:center;color:#aaa;" v-show="error">
      数据加载失败，请重试~
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in result"
        :key="item.id"
        :title="item.name"
        :label="item.artists[0].name"
        @click="autoPlay(item.id)"
      >
        <van-icon
          slot="right-icon"
          name="music-o"
          style="line-height: inherit;"
          size="1.5em"
        />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { getSearchSongResult } from "../../services/API";
export default {
  props:["m"],
  data() {
    return {
      error: false,
      result: [],
      getId: "",
      loading: false,
      finished: false,
      page: 0,
      limit: 20
    };
  },
  mounted() {
    this.result=[];
  },
  methods: {
    onLoad() {
      // 异步更新数据
      if (this.words !== "") {
        setTimeout(() => {
          for (let i = 0; i < 1; i++) {
            this.page++;
            this.getMusicList(this.words);
          }
          // 加载状态结束
          this.loading = false;
        }, 500);
      }
    },
    getMusicList() {
      getSearchSongResult({
        words: this.m,
        page: this.page,
        limit: this.limit
      })
        .then(response => {
          this.error = false;
          for (let i = 0; i < response.data.result.songs.length; i++) {
            this.result.push(response.data.result.songs[i]);
          }
        })
        .catch(() => {
          this.error = true;
        });
    },
    autoPlay(i) {
      this.getId = i;
      this.$emit("toParent", i, this.result);
    }
  }
};
</script>
<style scoped>
.router-link-active {
  font-size: 0.8rem;
  margin: 0.1rem 1.1rem;
  color: blue;
}
.searchResult {
  overflow: auto;
  height: 100%;
}
.searchResult .van-list {
  overflow: auto;
  height: 100%;
}
</style>
