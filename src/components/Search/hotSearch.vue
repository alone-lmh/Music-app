<template>
    <div class="hotSearch">
      <p>热门搜索</p>
      <div>
        <van-tag
          plain
          type="warning"
          size="medium"
          v-for="(item,i) in hotWords"
          :key="i" @click="getMusic(item.first)"
        >{{item.first}}</van-tag>
      </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
      hotWords: []
    };
  },
  mounted() {
    this.getHotSearch();
  },
  methods: {
    getHotSearch() {
      this.$axios.get("http://121.41.30.226:3000/search/hot").then(response => {
        this.hotWords = response.data.result.hots;
      });
    },
    getMusic(i) {
      this.$emit("to-parent",i)
    }
  }
}
</script>
<style scoped>
.hotSearch p {
  padding-left: 0.5rem;
  font-size: 0.9rem;
  margin: 0.5rem;
  color: #666;
}
.van-tag {
  margin: 0.1rem 0.3rem;
}
</style>