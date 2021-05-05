<template>
<!-- 首页 -->
  <div class="contain">
    <ul class="ul-cont">
      <li v-for="(item,index) in list" @click="clickFn(index)"
          :key="index">
        <span></span>
        <span>{{item.title}}</span>
      </li>
    </ul>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/footer'
export default {
  props: {

  },
  components: {
    Footer
  },
  data () {
    return {
      list: [
        {
          title: '通讯录'
        },
        {
          title: '聊天室'
        },
        {
          title: '模块3'
        },
        {
          title: '模块4'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    clickFn(ind){
      switch(ind){
        case 0:
          this.$router.push({
            name:'mailList'
          })
          break;
        case 1:
          this.$router.push({
            name:'chatroom'
          })
          break;
        case 2:
          break;
        case 3:
          break;
        default:
          break;
      }
    }
  },
  created () {

  },
  mounted () {
  
  }
}
</script>
<style scoped lang="scss">
.contain{
  width:100%;
  height:100%;
}
.ul-cont li {
  width: 100%;
  height: 200px;
  padding: 0 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  display: flex;
  > span:nth-child(1) {
    width: 70px;
    height: 70px;
    background: #ccc;
    margin-top: 60px;
    border-radius: 50%;
    margin-right: 40px;
  }
  > span {
    line-height: 200px;
  }
}
</style>