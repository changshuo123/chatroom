<template>
  <header class="header">
    <div @click="backOff" class="head-icon">
      <i class="iconfont icon-xiangzuo"></i>
    </div>
    <span class="header-title">{{title}}</span>
    <div class="head-icon">
      <span></span>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    title:{
      type:String 
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    backOff() {
      window.history.back()
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 200px;
  background: #fff;
  box-shadow: 0 3px 3px -3px #000;
  display: flex;
  justify-content: space-between;
  > .head-icon {
    width: 200px;
    @extend %flexCenter;
    i.iconfont {
      font-size: 130px;
    }
  }
  > .header-title {
    line-height: 200px;
  }
}
// .tab-header {
//   width: 700px;
//   height: 130px;
//   margin-top: 30px;
//   border: 6px solid #0091e4;
//   border-radius: 65px;
//   display: flex;

//   > span {
//     width: 50%;
//     @extend %flexCenter;
//     font-size: 60px;
//   }

//   > span.active {
//     background: #0091e4;
//   }
// }
</style>