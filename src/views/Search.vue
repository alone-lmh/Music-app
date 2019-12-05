<template>
  <div class="search">
      <form action="/">
        <van-search
          placeholder="请输入搜索关键词"
          v-model="value"
          @search="onSearch(value)"
          @input="getTip"
        />
      </form>
    <hotSearch v-show="hotFlag"></hotSearch>
    <tipSearch :m="value" v-show="tipFlag" ref="getFn"></tipSearch>
    <router-view v-show="searchFlag" ref="getResult"></router-view>
  </div>
</template>
<script>
import hotSearch from "../components/Search/hotSearch";
import tipSearch from "../components/Search/tipSearch";
export default {
  data() {
    return {
      value: "",
      hotFlag: true,
      tipFlag: false,
      searchFlag: false
    };
  },
  mounted() {
    if (this.$route.path == "/Search/searchResult") {
      this.hotFlag = false;
      this.tipFlag = false;
      this.searchFlag = true;
    }
  },
  methods: {
    onSearch(i) {
      this.hotFlag = false;
      this.tipFlag = false;
      this.searchFlag = true;
      this.$router.push({
        path: "/Search/searchResult",
        query: { keyword: i }
      });
      this.$refs.getResult.getMusicList(this.value);
    },
    getTip() {
      if (this.value == "") {
        if (this.$route.path == "/Search/searchResult") {
          this.hotFlag = false;
          this.tipFlag = false;
          this.searchFlag = true;
        } else {
          this.hotFlag = true;
          this.tipFlag = false;
          this.searchFlag = false;
        }
      } else {
        this.hotFlag = false;
        this.tipFlag = true;
        this.searchFlag = false;
        this.$refs.getFn.getTip(this.value);
      }
    }
  },
  components: {
    hotSearch,
    tipSearch
  }
};
</script>
