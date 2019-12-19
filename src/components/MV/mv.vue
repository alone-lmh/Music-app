<template>
  <div class="mv">
    <form action="/">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
        @search="onSearch"
        @input="clear"
      />
    </form>
    <van-loading
      type="spinner"
      style="text-align:center;"
      v-show="showLoading"
    />
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, i) in mv"
        :key="i"
        :title="item.name"
        v-show="isShow"
      >
        <video
          class="vidio"
          :src="item.url"
          controls
          width="100%"
          :poster="item.imgUrl"
        ></video>
      </van-cell>
      <van-cell
        v-for="(item, i) in Video"
        :key="i"
        :title="item.name"
        v-show="!isShow"
      >
        <video
          class="vidio"
          :src="item.url"
          controls
          width="100%"
          :poster="item.imgUrl"
          type="video/mp4"
        ></video>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import {
  getAllMv,
  getMvUrl,
  getSearchVideoResult,
  getVideoUrl
} from "../../services/API";
export default {
  props: ["isplay"],
  data() {
    return {
      isShow: true,
      value: "",
      mv: [],
      Video: [],
      loading: false,
      finished: false,
      showLoading: false,
      error: false,
      page: 0,
      limit: 5
    };
  },
  methods: {
    getMvId() {
      getAllMv({ page: this.page, limit: this.limit })
        .then(response => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.getMvUrl(
              response.data.data[i].id,
              response.data.data[i].name,
              response.data.data[i].cover
            );
          }
        })
        .catch(() => {
          this.error = true;
        });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 1; i++) {
          this.page++;
          if (this.Video.length !== 0) {
            this.onSearch();
          } else {
            this.getMvId();
          }
        }
        // 加载状态结束
        this.loading = false;
      }, 500);
    },
    getMvUrl(id, name, imgUrl) {
      getMvUrl(id)
        .then(response => {
          this.error = false;
          this.mv.push({
            name: name,
            url: response.data.data.url,
            imgUrl: imgUrl
          });
        })
        .catch(() => {
          this.error = true;
        });
    },
    getVideoUrl(id, name, imgUrl) {
      getVideoUrl(id)
        .then(response => {
          this.error = false;
          this.Video.push({
            name: name,
            url: response.data.urls[0].url.slice(
              0,
              response.data.urls[0].url.lastIndexOf("&")
            ),
            imgUrl: imgUrl
          });
        })
        .catch(() => {
          this.Video.push({
            name: name,
            url: "",
            imgUrl: imgUrl
          });
        });
    },
    onSearch() {
      this.isShow = false;
      getSearchVideoResult({
        words: this.value,
        page: this.page,
        limit: this.limit
      })
        .then(response => {
          this.error = false;
          this.showLoading = false;
          if (response.data.result.videos) {
            for (let i = 0; i < response.data.result.videos.length; i++) {
              this.getVideoUrl(
                response.data.result.videos[i].vid,
                response.data.result.videos[i].title,
                response.data.result.videos[i].coverUrl
              );
            }
            if (response.data.result.videos.length < 5) {
              this.finished = true;
            }
          } else {
            this.finished = true;
          }
        })
        .catch(() => {
          this.showLoading = false;
        });
      this.showLoading = true;
    },
    clear() {
      this.finished = false;
      this.Video = [];
      this.isShow = true;
    }
  }
};
</script>
<style scoped>
.mv {
  text-align: center;
  border-bottom: 1px #ccc solid;
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.mv form {
  position: relative;
}
.mv .van-list {
  flex: 1;
  overflow: auto;
}
</style>
