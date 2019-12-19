<template>
  <div class="searchResult">
    <!-- <div style="text-align:center;color:#aaa;" v-show="error">
      数据加载失败，请重试~
    </div> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
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
  props: ["m"],
  data() {
    return {
      error: false,
      result: [],
      getId: "",
      loading: false,
      finished: false,
      page: 0,
      limit: 20,
      words: ""
    };
  },
  mounted() {
    this.page = 0;
    this.result = [];
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 1; i++) {
          this.getMusicList(this.words);
          this.page++;
        }
        // 加载状态结束
        this.loading = false;
      }, 500);
    },
    getMusicList(words) {
      this.words = words;
      getSearchSongResult({
        words: this.m || this.words,
        page: this.page,
        limit: this.limit
      })
        .then(response => {
          this.error = false;
          if (response.data.result.songs) {
            for (let i = 0; i < response.data.result.songs.length; i++) {
              this.result.push(response.data.result.songs[i]);
            }
            if (
              response.data.result.songs.length < 20 ||
              response.data.result.songCount == 0
            ) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        })
        .catch(() => {
          if (this.result >= 20) {
            this.error = true;
          }
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
