<template>
  <div class="search iptSearch">
    <form action="/">
      <van-search placeholder="请输入搜索关键词" v-model="value" @search="onSearch()" @input="getTip" />
    </form>
    <hotSearch v-show="hotFlag" @to-parent="getKeyWords"></hotSearch>
    <tipSearch :m="value" v-show="tipFlag" ref="getFn" @to-parent="getKeyWords"></tipSearch>
    <searchResult v-show="searchFlag" ref="getResult" @toParent="getMusicId"></searchResult>
  </div>
</template>
<script>
import hotSearch from "../components/Search/hotSearch.vue";
import tipSearch from "../components/Search/tipSearch.vue";
import searchResult from "../components/Search/searchResult.vue";
export default {
  data() {
    return {
      value: "",
      hotFlag: true,
      tipFlag: false,
      searchFlag: false,
      musicId:''
    };
  },
  methods: {
    onSearch() {
      this.hotFlag = false;
      this.tipFlag = false;
      this.searchFlag = true;
      this.$refs.getResult.getMusicList(this.value);
    },
    getKeyWords(i) {
      this.value = i;
      this.onSearch();
    },
    getTip() {
      if (this.value == "") {
        this.hotFlag = true;
        this.tipFlag = false;
        this.searchFlag = false;
      } else {
        this.hotFlag = false;
        this.tipFlag = true;
        this.searchFlag = false;
        this.$refs.getFn.getTip(this.value);
      }
    },getMusicId(i){
      this.musicId=i;
      this.$emit("to-parent",i);
    }
  },
  components: {
    hotSearch,
    tipSearch,
    searchResult
  }
};
</script>
