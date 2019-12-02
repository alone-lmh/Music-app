<template>
  <div class="NewMusic">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      images: [],
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.getBannerImgs();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    getBannerImgs() {
      this.$axios.get("http://192.168.11.210:3000/banner?type=1").then(response => {
        this.images = response.data.banners;
      });
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
}
.van-swipe{
  width:100%;
}
</style>