<template>
  <div class="tip">
    <div>
      <p :to="{name:'Search'}" @click="getMusic(m)" class="goResult">搜索“{{m}}”</p>
      <van-cell
        v-for="(item,i) in tipWords"
        :key="i"
        :title="item.keyword"
        icon="search"
        @click="getMusic(item.keyword)"
      />
    </div>
  </div>
</template>
<script>
import {getSearchTip} from "../../services/API"
export default {
  props: ["m"],
  data() {
    return {
      flag: true,
      tipWords: []
    };
  },
  methods: {
    getTip(i) {
     getSearchTip(i).then(response => {
          this.tipWords = response.data.result.allMatch;
        });
    },
    getMusic(i) {
      this.$emit("to-parent", i);
    }
  }
};
</script>
<style scoped>
.tip {
  overflow: auto;
  height: 100%;
}

.goResult {
  font-size: 0.8rem;
  margin: 0.1rem 1.1rem;
  color: blue;
}
</style>