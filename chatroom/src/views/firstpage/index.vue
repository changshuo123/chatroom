<template>
  <div class="contain">
    <ul class="ul-cont">
      <li v-for="(item,index) in list" @click="clickFn(index)"
          :key="index">
        <span></span>
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
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
          title: '消息中心'
        },
        {
          title: '我的手机'
        },
        {
          title: 'web开发讨论组'
        },
        {
          title: '好友A'
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
            name:'chatroom'
          })
          break;
        case 1:
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