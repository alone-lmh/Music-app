<template>
  <div>
    <van-list>
      <van-cell
        v-for="item in result"
        :key="item.id"
        :title="item.name"
        :label="item.artists[0].name"
        @click="autoPlay(item.id)"
      >
        <van-icon slot="right-icon" name="music-o" style="line-height: inherit;" size="1.5em" />
      </van-cell>
    </van-list>
    <bottomMusic v-if="flag" :key="getId" :musicId="getId"></bottomMusic>
  </div>
</template>
<script>
import bottomMusic from '../banner/bottomMusic.vue'
export default {
  data() {
    return {
      keyWord: this.$route.query.keyword,
      result: [],
      flag:false,
      getId:''
    };
  },components:{
      bottomMusic
  },
  mounted() {
    this.getMusicList(this.keyWord);
  },
  methods: {
    getMusicList(i) {
      this.$axios
        .get("http://121.41.30.226:3000/search?keywords=" + i)
        .then(response => {
          this.result = response.data.result.songs;
        });
    },autoPlay(i){
        this.flag="true";
        this.getId=i
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
</style>