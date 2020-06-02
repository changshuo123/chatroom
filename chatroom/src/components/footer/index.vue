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
  height: 200px;
  background: #fff;
  box-shadow:0 0 10px 5px #aaa;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  > span {
    width:25%;
    font-size: 64px;
    @extend %flexCenter;
  }
}
</style>