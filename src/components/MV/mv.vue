<template>
  <div class="mv">
    <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,i) in mv" :key="i" :title="item.name">
        <video class="vidio" :src="item.url" controls width="100%" :poster="item.imgUrl"></video>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mv: [],
      loading: false,
      finished: false,
      error: false,
      page: 0,
      limit: 5
    };
  },
  methods: {
    getMvId() {
      this.$axios
        .get(
          "http://121.41.30.226:3000/mv/all?offset=" +
            this.page * this.limit +
            "&limit=" +
            this.limit
        )
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
          this.getMvId();
        }
        // 加载状态结束
        this.loading = false;
      }, 500);
    },
    getMvUrl(id, name, imgUrl) {
      this.$axios
        .get("http://121.41.30.226:3000/mv/url?id=" + id)
        .then(response => {
          this.mv.push({
            name: name,
            url: response.data.data.url,
            imgUrl: imgUrl
          });
        })
        .catch(() => {
          this.error = true;
        });
    }
  }
};
</script>
<style  scoped>
.mv {
  text-align: center;
  border-bottom: 1px #ccc solid;
  flex: 1;
  overflow: auto;
}
.mv .van-list {
  height: 100%;
  overflow: auto;
}
</style>