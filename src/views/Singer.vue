<template>
  <div>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for="p in items"
        :key="p.pst"
        :title="p.text"
      ></van-sidebar-item>
    </van-sidebar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeKey: 0,
      items: [
        { text: "入驻歌手", pst: "5001" },
        { text: "华语男歌手", pst: "1001" },
        { text: "华语女歌手", pst: "1002" },
        { text: "华语组合/乐队", pst: "1003" },
        { text: "欧美男歌手", pst: "2001" },
        { text: "欧美女歌手", pst: "2002" },
        { text: "欧美组合/乐队", pst: "2003" },
        { text: "日本男歌手", pst: "6001" },
        { text: "日本女歌手", pst: "6002" },
        { text: "日本组合/乐队", pst: "6003" },
        { text: "韩国男歌手", pst: "7001" },
        { text: "韩国女歌手", pst: "7002" },
        { text: "韩国组合/乐队", pst: "7003" },
        { text: "其他男歌手", pst: "4001" },
        { text: "其他女歌手", pst: "4002" },
        { text: "其他组合/乐队", pst: "4003" }
      ]
    };
  },
  methods: {
    PST(index, event) {
      console.log(index);
      console.log(event);
    }
  }
};
</script>
