<template>
  <div class="SongList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-show="!isInfo"
    >
      <van-cell
        v-for="item in list"
        :key="item.id"
        @click="setInfo(item.id)"
        class="Img-content"
      >
        <div class="Img">
          <img :src="item.coverImgUrl" />
        </div>
        <div class="Img-right">
          <p>{{ item.name }}</p>
          <p>by&nbsp;{{ item.creator.nickname }}</p>
        </div>
      </van-cell>
    </van-list>
    <SongListInfo
      v-show="isInfo"
      ref="Infoid"
      v-on:getInfo="IsInfo"
      v-on:getInfoid="music_id"
    ></SongListInfo>
  </div>
</template>
<script>
import SongListInfo from "../components/Songlist/SongListInfo.vue";
export default {
  data() {
    return {
      list: [],
      num: [],
      loading: false,
      finished: false,
      isInfo: false
    };
  },
  created() {
    this.getSongList();
  },
  components: {
    SongListInfo
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.num.push(this.num.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.num.length >= 10) {
          this.finished = true;
        }
      }, 500);
    },
    getSongList() {
      this.$axios
        .get("http://121.41.30.226:3000/top/playlist/catlist")
        .then(response => {
          //   console.log(response.data.playlists);
          this.list = response.data.playlists;
        });
    },
    setInfo(id) {
      this.isInfo = true;
      if (id) {
        this.$refs.Infoid.setInfo(id);
      }
    },
    IsInfo: function(string) {
      this.isInfo = string == "false" ? false : true;
    },
    music_id: function(id, list) {
      this.$emit("to-parent", id, list);
    }
  }
};
</script>
<style scoped>
.SongList {
  width: 100%;
  overflow: hidden;
}
.Img-content {
  padding: 0.5rem 0;
  margin: 0 1rem;
  position: relative;
  height: 7rem;
  border-bottom: 1px solid #f1f1f1;
  border-top: 1px solid #f1f1f1;
}
.Img {
  float: left;
  width: 5.6rem;
  height: 7rem;
}
.Img img {
  width: 5.6rem;
  height: 5.6rem;
  margin: 0.7rem 0;
}
.Img-right {
  float: left;
  margin: 0.7rem 0;
  min-height: 5.6rem;
  position: relative;
}
.Img-right > p:nth-child(1) {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
  margin: 0 0.5rem;
  width: 11rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.Img-right > p:nth-child(2) {
  font-size: 0.8rem;
  color: #9b9b9b;
  position: absolute;
  bottom: 0.5rem;
  margin: 0 0.5rem;
}
</style>
