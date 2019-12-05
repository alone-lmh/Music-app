<template>
  <div id="listening">
    <van-nav-bar :title="details.name" left-arrow @click-left="back" />
    <van-image
      fit="cover"
      round
      width="15rem"
      height="15rem"
      :src="details.al.picUrl"
      id="smallImg"
    />
    <van-swipe style="height:2rem;" vertical :show-indicators="false" :initial-swipe="initNum">
      <van-swipe-item v-for="(item,i) in songWords" :key="i">{{item}}</van-swipe-item>
    </van-swipe>
    <div @click.capture="isPlaying" class="mp3Div">
      <audio id="mp3" :src="musicSrc" controls="controls" @click="isPlaying" autoplay="true"></audio>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details: { name: "", al: "" },
      songWords: [],
      musicSrc: "",
      wordsTime: [],
      initNum: 0,
      timer: null
    };
  },
  mounted() {
    this.showWords();
    this.getSongsDetail(this.$route.query.id);
    this.getSongWords(this.$route.query.id);
    this.getMusicSrc(this.$route.query.id);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getSongsDetail(i) {
      this.$axios
        .get("http://121.41.30.226:3000/song/detail?ids=" + i)
        .then(response => {
          this.details = response.data.songs[0];
        });
    },
    getSongWords(i) {
      this.$axios
        .get("http://121.41.30.226:3000/lyric?id=" + i)
        .then(response => {
          if (response.data.lrc.lyric && response.data.lrc.lyric !== "") {
            //将获取到的时间数据转换为几分几秒，然后将它与当前播放时间进行对比来判断应该显示哪句歌词
            let arr = response.data.lrc.lyric.split("\n").filter((v, i) => {
              return v !== "";
            });
            // console.log(arr)
            //去除中括号,并将其按照：分割为数组
            let arr0 = arr.map((v, i) => {
              return v.split("]")[0].split("[")[1];
            });
            
            arr0 = arr0.map((v, i) => {
              return v.split(":");
            });
            
            //转化为秒
            let timeArr = arr0.map((v, i) => {
              return v[0] * 60 + parseFloat(v[1]);
            });
            
            //歌词
            let musicWords = arr.map((v, i) => {
              return v.split("]")[1];
            });
            this.wordsTime = timeArr;
            this.songWords = musicWords;
            // console.log(this.wordsTime)
            // console.log(this.songWords)
          }
        });
    },
    showWords() {
      this.timer = setInterval(() => {
        // console.log(1)
        let second = document.getElementById("mp3").currentTime;
        //   console.log(second)
        for (let i=0;i<this.wordsTime.length;i++) {
          if (
            second >= this.wordsTime[i] &&
            second <= this.wordsTime[i + 1]
          ) {
            this.initNum = Number(i);
          }
        }
      }, 100);
    },
    getMusicSrc(i) {
      this.$axios
        .get("http://121.41.30.226:3000/song/url?id=" + i)
        .then(response => {
          this.musicSrc = response.data.data[0].url;
        });
    },
    back() {
      this.$router.push({ path: "/" });
    },
    isPlaying() {
      /* if (!document.getElementById("mp3").paused) {
        console.log("清除");
        clearInterval(this.timer);
      } else {
        console.log("定时器");
        this.getSongWords();
      } */
    }
  }
};
</script>
<style scoped>
#listening {
  text-align: center;
}
#smallImg {
  margin: 3rem 0 3rem;
}
.van-swipe-item {
  color: rgb(255, 68, 0);
}
.mp3Div {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  padding: 0.6rem 0;
  background: rgba(241, 241, 241);
}
</style>