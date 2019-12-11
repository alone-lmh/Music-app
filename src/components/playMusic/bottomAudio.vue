<template>
    <div class="bottomMusic">
      <van-card
        :desc="details.ar[0].name"
        :title="details.name"
        :thumb="details.al.picUrl"
        :centered="false"
        @click="isPlaying"
      >
        <div slot="tags" class="custom">
          <span class="nowTime">{{nowTime}}</span>
          <van-slider v-model="value" class="slider" @change="onChange" />
          <span class="totalTime">{{totalTime}}</span>
          <van-icon name="play" v-show="showShade" class="playIcon" @click.stop="playMusic" />
          <van-icon name="pause" v-show="!showShade" class="pauseIcon" @click.stop="timeOut" />
          <van-icon name="weapp-nav" class="musicList" @click.stop="listFlag=!listFlag" />
        </div>
      </van-card>
      <van-list class="tipMusicList" v-show="listFlag">
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          @click="emitToParent(item.id)"
        >
          <van-icon slot="right-icon" name="music-o" style="line-height: inherit;" size="1.5em" />
        </van-cell>
      </van-list>
    <audio id="mp3" :src="musicSrc" controls="controls" autoplay></audio>
    <van-popup v-model="show" round closeable :style="{ width: '80%' }">
      <p>不好意思呢~ o(*￣▽￣*)o</p>
      <p>此歌曲我们还未获得播放版权</p>
    </van-popup>
  </div>
</template>
<script>
//show用于判断是否可以播放歌曲  timer用于设置定时器  nowTimeSecond当前播放时间（秒） totalTimeSecond歌曲总时长（秒）
export default {
  data() {
    return {
      details: { name: "", al: "", ar: [{ name: "" }] },
      musicSrc: "",
      show: false,
      timer: null,
      showShade: false,
      value: 0,
      nowTimeSecond: 0,
      totalTimeSecond: 0,
      nowTime: "0:00",
      totalTime: "0:00",
      listFlag: false
    };
  },
  props: ["musicId", "list"],
  mounted() {
    clearInterval(this.timer);
    this.getMusicSrc(this.musicId);
    this.getTotalTime();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    intoMinutes(time, result) {
      //分钟
      var minute = time / 60;
      var minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = minutes;
      }
      //秒
      var second = time % 60;
      var seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (result == "nowTime") {
        this.nowTime = minutes + ":" + seconds;
      }
      if (result == "totalTime") {
        this.totalTime = minutes + ":" + seconds;
      }
    },
    showTimes() {
      this.timer = setInterval(() => {
        //获取当前的播放时间
        this.nowTimeSecond = document.getElementById("mp3").currentTime;
        this.intoMinutes(this.nowTimeSecond, "nowTime");
        //设置滑块的进度
        this.value = (this.nowTimeSecond / this.totalTimeSecond) * 100;
        //当歌曲播放完随机播放列表中的歌曲
        if (this.nowTimeSecond !== 0) {
          if (this.nowTimeSecond == this.totalTimeSecond) {
            this.$emit(
              "to-parent",
              this.list[parseInt(Math.random() * this.list.length)].id,
              this.list
            );
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
    getTotalTime() {
      let audio = document.getElementById("mp3");
      audio.oncanplay = () => {
        this.totalTimeSecond = audio.duration;
        this.intoMinutes(this.totalTimeSecond, "totalTime");
      };
    },
    isPlaying() {
      // 展示播放详情页

    },
    timeOut() {
      document.getElementById("mp3").pause();
      clearInterval(this.timer);
    },
    playMusic() {
      document.getElementById("mp3").play();
      clearInterval(this.timer);
      this.showTimes();
    },
    onChange() {
      this.playMusic();
      this.nowTimeSecond = (this.value / 100) * this.totalTimeSecond;
      document.getElementById("mp3").currentTime = this.nowTimeSecond;
      this.intoMinutes(this.nowTimeSecond, "nowTime");
    },
    emitToParent(i, list) {
      this.$emit("to-parent", i, this.list);
      this.listFlag = false;
    }
  }
};
</script>
<style scoped>
.tipMusicList {
  position: fixed;
  max-height: 40%;
  overflow: auto;
  bottom: 5em;
  text-align: left;
  background: rgba(230, 230, 230, 0.7);
  width: 100%;
  border: 1px #ccc solid;
}
#mp3 {
  display: none;
}
.custom {
  display: flex;
}

.slider {
  flex: 1;
  margin: 0 1em;
  align-self: center;
}
.playIcon,
.musicList,
.pauseIcon {
  font-size: 1.5em;
}
.playIcon,
.musicList,
.pauseIcon {
  margin-left: 0.5em;
}
.van-card__thumb {
  width: 5em;
  height: 5em;
}
.van-card {
  position: relative;
  box-sizing: border-box;
  padding: 0.7em 1.2em;
  color: #323233;
  font-size: 0.8em;
  background-color: #f7f8f8;
  margin: 0;
}
.van-card__content {
  min-height: 0;
}
</style>