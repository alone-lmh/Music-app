<template>
  <div class="NewMusic">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.pic" @click="getMusic(image.song.id)" />
      </van-swipe-item>
    </van-swipe>
    <lazy-component>
      <van-list>
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :label="item.song.artists[0].name"
          @click="autoplay(item.id)"
        >
          <van-icon slot="right-icon" name="music-o" style="line-height: inherit;" size="1.5em" />
        </van-cell>
      </van-list>
    </lazy-component>
    <listening v-if="flag" :key="getId" :musicId="getId"></listening>
  </div>
</template>
<script>
import listening from "../components/banner/index.vue";
export default {
  data() {
    return {
      active: 1,
      images: [],
      list: [],
      flag: false,
      getId: ""
    };
  },
  created() {
    this.getBannerImgs();
    this.getNewMusic();
  },
  components: {
    listening
  },
  methods: {
    getBannerImgs() {
      this.$axios
        .get("http://121.41.30.226:3000/banner?type=1")
        .then(response => {
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
      this.getId = i;
      this.flag = true;
    },
    autoplay(i) {
      this.flag = true;
      this.getId = i;
      setTimeout(() => {
        document.getElementById("listening").style.zIndex = 1000;
      });
    }
  }
};
</script>
<style scoped>
.van-swipe img {
  width: 100%;
}
.van-tabs__content {
  flex: 1;
  overflow: auto;
}
</style>