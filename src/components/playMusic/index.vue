<template>
  <div id="listening">
    <div id="top">
      <van-nav-bar :title="details.name" left-arrow @click-left="back" />
      <van-image
        fit="cover"
        round
        width="15rem"
        height="15rem"
        :src="details.al.picUrl"
        id="smallImg"
        @click="timeOut"
      />
      <div class="shade" v-show="showShade" @click="playMusic">
        <van-icon class="stop" name="play-circle-o" size="5em" color="rgba(255,255,255,0.5)" />
      </div>
      <van-swipe
        style="height:5rem;"
        vertical
        :show-indicators="false"
        :initial-swipe="initNum"
        :touchable="false"
      >
        <van-swipe-item v-for="(item,i) in songWords" :key="i">{{item}}</van-swipe-item>
      </van-swipe>
    </div>
    <div @click="isPlaying" class="mp3Div">
      <audio id="mp3" :src="musicSrc" controls="controls" autoplay="false"></audio>
    </div>
    <van-popup v-model="show" round closeable :style="{ width: '80%' }">
      <p>不好意思呢~ o(*￣▽￣*)o</p>
      <p>此歌曲我们还未获得播放版权</p>
    </van-popup>
  </div>
</template>
<script>
//initNum设置歌初始的轮播位置   show用于判断是否可以播放歌曲  timer用于设置定时器  showShade用于展示图片上的遮罩层     count用于记录图片旋转的角度
export default {
  data() {
    return {
      details: { name: "", al: "" },
      songWords: [],
      musicSrc: "",
      wordsTime: [],
      initNum: 0,
      show: false,
      timer: null,
      showShade: false,
      count: 0
    };
  },
  props: ["musicId"],
  mounted() {
    this.showWords();
    this.getSongsDetail(this.musicId);
    this.getSongWords(this.musicId);
    this.getMusicSrc(this.musicId);
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
          // 判断是否存在歌词
          if (
            response.data.lrc &&
            response.data.lrc.lyric !== "" &&
            response.data.lrc.lyric.includes("[") &&
            response.data.lrc.lyric.includes("]")
          ) {
            //过滤数组中的空元素
            let arr = response.data.lrc.lyric.split("\n").filter((v, i) => {
              return v !== "";
            });
            // console.log(arr)
            //获取时间
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

            //获取歌词
            let musicWords = arr.map((v, i) => {
              return v.split("]")[1];
            });
            this.wordsTime = timeArr;
            this.songWords = musicWords;
          } else {
            this.wordsTime = [1000];
            this.songWords = ["没有获取到歌曲信息~"];
          }
          // console.log(this.wordsTime)
          // console.log(this.songWords)
        });
    },
    showWords() {
      //设置定时器通过歌曲的播放时间判断应该显示哪句歌词
      this.timer = setInterval(() => {
        if (document.getElementById("mp3").paused) {
          this.showShade = true;
        } else {
          this.showShade = false;
          document.getElementById("smallImg").style.transform =
            "rotate(" + this.count + "deg)";
          this.count++;
        }
        let second = document.getElementById("mp3").currentTime;
        //   console.log(second)
        for (let i = 0; i < this.wordsTime.length; i++) {
          if (this.wordsTime[i + 1]) {
            if (
              second >= this.wordsTime[i] &&
              second <= this.wordsTime[i + 1]
            ) {
              this.initNum = Number(i);
            }
          } else {
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
          if (!this.musicSrc) {
            this.show = true;
          }
        });
    },
    back() {
      setTimeout(() => {
        document.getElementById("listening").style.position = "relative";
        document.getElementById("listening").style.height = "auto";
        document.getElementById("top").style.flex = "0 0 0";
      });
    },
    isPlaying() {
      // 展示播放详情页
      setTimeout(() => {
        document.getElementById("listening").style.position = "fixed";
        document.getElementById("listening").style.top = 0;
        document.getElementById("listening").style.height = "100%";
        document.getElementById("top").style.flex = "1";
      });
    },
    timeOut() {
      this.showShade = true;
      document.getElementById("mp3").pause();
      clearInterval(this.timer);
    },
    playMusic() {
      this.showShade = false;
      document.getElementById("mp3").play();
      clearInterval(this.timer);
      this.showWords();
    }
  }
};
</script>
<style scoped>
#listening {
  overflow: hidden;
  text-align: center;
  z-index: 1000;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}
#top {
  position: relative;
  width: 100%;
}
#smallImg {
  margin: 3rem 0 3rem;
}
.shade {
  position: absolute;
  top: 5.9em;
  left: 50%;
  margin-left: -7.5rem;
  height: 15rem;
  width: 15rem;
  text-align: center;
  line-height: 15rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
}
.stop {
  line-height: 15rem;
}
.mp3Div {
  width: 100%;
  background: #f1f3f4;
}
#mp3 {
  display: block;
  width: 80%;
  margin: 0 auto;
}
</style>