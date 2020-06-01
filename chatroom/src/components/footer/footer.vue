<template>
  <footer class="footer">
    <router-link v-for="(item,index) in list"
                 :key="index"
                 :to="item.link"
                 tag="span">{{item.title}}</router-link>
  </footer>
</template>
<script>
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      list: [
        {
          title: "首页",
          link: "/first"
        },
        {
          title: "聊天室",
          link: "/chatroom"
        },
        {
          title: "视频聊天",
          link: "/livevideo"
        },
        {
          title: "我的",
          link: "/my"
        }
      ]
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
.footer {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  > span {
    flex: 1;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>