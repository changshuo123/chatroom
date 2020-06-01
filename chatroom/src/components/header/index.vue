<template>
  <header class="header">
    <div @click="backOff">
      <i class="iconfont icon-xiangzuo"></i>
    </div>
    <span>header</span>
    <div>
      <span></span>
    </div>
    
  </header>
</template>
<script>
export default {
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    backOff(){
      this.$router.back()
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 200px;
  background: #fff;
  box-shadow: 0 3px 3px -3px #000;
  display:flex;
  justify-content: space-between;
  >div:nth-child(1){
    width:200px;
    @extend %flexCenter;
    i.iconfont{
      font-size: 130px;
    }
  }
  >div:nth-child(3){
    width:200px;
  }
  >span:nth-child(2){
    line-height: 200px;
  }
}
</style>