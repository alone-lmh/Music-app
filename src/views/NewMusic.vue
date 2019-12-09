<template>
  <div class="NewMusic">
    <van-swipe >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.pic" @click="getMusic(image.song.id)" />
      </van-swipe-item>
    </van-swipe>
      <van-list>
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :label="item.song.artists[0].name"
          @click="getMusic(item.id)"
        >
          <van-icon slot="right-icon" name="music-o" style="line-height: inherit;" size="1.5em" />
        </van-cell>
      </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [],
      list: [],
      getId: ""
    };
  },
  created() {
    this.getBannerImgs();
    this.getNewMusic();
  },
  methods: {
    getBannerImgs() {
      this.$axios
        .get("http://121.41.30.226:3000/banner?type=1")
        .then(response => {
          //过滤掉没有歌曲信息的图片
          this.images = response.data.banners.filter((v, i) =>
            v.song ? true : false
          );
        });
    },
    getNewMusic() {
      this.$axios
        .get("http://121.41.30.226:3000/personalized/newsong")
        .then(response => {
          this.list = response.data.result;
        });
    },
    getMusic(i) {
      //向父元素提交音乐id
      this.getId = i;
      this.$emit("to-parent",i);
    }
  }
};
</script>
<style scoped>
.van-swipe img {
  width: 100%;
  display:block;
}
.van-tabs__content {
  flex: 1;
  overflow: auto;
}
</style>