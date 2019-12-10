<template>
  <div id="SongListInfo">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="ImgTop">
        <van-image cover :src="imgurl" class="ImgBgd" />
        <van-sticky class="Info-top">
          <van-nav-bar
            :title="name"
            left-arrow
            @click-left="onClickLeft"
            style="background:rgba(150,150,150,0.3);"
          />
        </van-sticky>
      </div>
      <div class="ImgBtm">
        <div class="ImgBtmTag" style="padding: 0.6rem 0.6rem 0 1rem;">
          标签:
          <van-tag
            round
            color="#666"
            plain
            size="0.6rem"
            v-for="item in tags"
            :key="item"
            style="margin:0 0.6rem;"
            >{{ item }}</van-tag
          >
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="简介：" name="1">{{
            description
          }}</van-collapse-item>
        </van-collapse>
      </div>
      <div class="SongLists">
        <h3>歌曲列表</h3>
        <div>
          <a
            v-for="(item, num) in list"
            :key="item.id"
            @click="getInfoid(item.id)"
            style="display:flex;width:100%;height:3.4rem;position:relative"
          >
            <div class="snum">{{ num + 1 }}</div>
            <div style="float:left;flex:1;" class="bord">
              <div style="width:18.325rem;float:left;padding:6px 0;">
                <p style="font-size:1.06rem;line-height:1.55rem;">
                  {{ item.name }}
                </p>
                <p style="font-size:0.75rem;color:#888;line-height:1.1rem;">
                  {{ item.ar[0].name }}-{{ item.al.name }}
                </p>
              </div>
              <div
                style="float:right;margin-right:10px;line-height:3.4rem;font-size:1.375rem;"
              >
                <van-icon name="music-o" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </van-list>
    <div style="height:5rem;width:auto;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      imgurl: "",
      name: "",
      tags: [],
      activeNames: ["0"],
      description: "",
      num: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("getInfo", "false");
    },
    getInfoid(id) {
      this.$emit("getInfoid", id);
    },
    setInfo: function(setInfoid) {
      this.$axios
        .get("http://121.41.30.226:3000/playlist/detail?id=" + setInfoid)
        .then(response => {
          // console.log(response.data.playlist.coverImgUrl);
          this.list = response.data.playlist.tracks;
          this.name = response.data.playlist.name;
          this.tags = response.data.playlist.tags;
          this.description = response.data.playlist.description;
          this.imgurl = response.data.playlist.coverImgUrl;
        });
    },
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
    }
  }
};
</script>
<style scoped>
#SongListInfo {
  z-index: 99;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}
.ImgTop {
  height: 18rem;
  position: relative;
  overflow: hidden;
}
.ImgBgd {
  height: 13rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  overflow: hidden;
  background: url();
}
.Info-top {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}
.ImgBtm {
  min-height: 5rem;
  width: 100%;
  margin-top: -5rem;
  background: #fff;
  font-size: 0.75rem;
  color: #666;
}
.van-nav-bar .van-icon {
  color: #fff;
  font-size: 1.7rem;
}
.van-nav-bar__title {
  color: #fff;
}
.van-image__img {
  height: auto !important;
}
.snum {
  width: 2.5rem;
  line-height: 3.4rem;
  color: #999;
  text-align: center;
  font-size: 1.06rem;
  margin-left: -8px;
  float: left;
}
.bord:after {
  position: absolute;
  z-index: 0;
  content: "";
  top: 0;
  right: 0;
  pointer-events: none;
  box-sizing: border-box;
  width: 91%;
  height: 100%;
  transform-origin: top left;
  border: 0 solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
}
h3 {
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.4rem;
  background: #eee;
  margin: 0;
  padding: 0 0.6rem;
}
p {
  margin: 0;
  width: 18.325rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
