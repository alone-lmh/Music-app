<template>
  <div @click.capture="isPlaying(musicId)" class="mp3Div">
    <audio class="mp3" :src="musicSrc" controls="controls" autoplay="true"></audio>
  </div>
</template>
<script>
export default {
  props:["musicId"],
  data() {
    return { musicSrc: "" };
  },
  mounted() {
    this.getMusicSrc(this.musicId)
  },
  methods: {
    getMusicSrc(i) {
      this.$axios
        .get("http://121.41.30.226:3000/song/url?id=" + i)
        .then(response => {
          this.musicSrc = response.data.data[0].url;
        });
    },isPlaying(i){
        this.$router.push({path:'/details',query:{id:i}});
    }
  }
};
</script>
<style scoped>
.mp3Div {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  padding: 0.6rem 0;
  text-align: center;
  background: rgba(241, 241, 241);
}
</style>