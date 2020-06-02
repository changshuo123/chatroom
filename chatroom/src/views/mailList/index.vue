<template>
  <div class="contain">
    <Header :title="title" />
    <div class="list-main">
      <div class="nav-top">
        <div>添加好友/群</div>
        <div>创建群/组</div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header";
export default {
  props: {},
  components: {
    Header,
  },
  data() {
    return {
      title: "通讯录",
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.list-main{
  width:100%;
  height:100%;
  padding-top: 200px;
}
.nav-top {
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ccc;
  padding: 30px 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  > div {
    min-width: 45%;
    height: 200px;
    border: 1px solid #ccc;
    box-shadow: 4px 4px 18px #ccc;
    text-align: center;
    line-height: 200px;
    font-size: 60px;
  }
}
</style>
