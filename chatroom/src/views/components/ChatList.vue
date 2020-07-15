<template>
  <!--  -->
  <div id="chat-main" class="chat-main">
    <div class="chat-msg">
      <!-- <ul>
        <li>---- 上拉加载更多 ----</li>
        <li>-已无更多记录-</li>
        <li>-time-</li>
      </ul>-->
      <ul class="session-main">
        <li
          :class="{'session-chat-l':item.flow === 'out','session-chat-r':item.flow === 'in'}"
          v-for="item in msglist"
          :key="item.id"
        >
          <p class="time-tag" v-if="item.type === 'timeTag'">{{item.text}}</p>
          <span v-if="item.type === 'text'" class="head-img"></span>
          <!-- <img :src="item." alt=""> -->
          <span v-if="item.type === 'text'" class="session-message">{{item.text}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msglist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  // methods: {},
  mounted() {
    console.log(this.msglist);
  }
};
</script>
<style scoped lang="scss">
.chat-main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex: 1;
  .chat-msg {
    width: 100%;
    height: 100%;

    .session-main{
      padding-bottom: 100px;
    }
  }
}
.session-chat-l {
  clear: both;
  padding: 50px 40px;
  box-sizing: border-box;
  > span.head-img {
    float: left;
    width: 170px;
    height: 170px;
    background: #ccc;
    border-radius: 50%;
    margin-right: 50px;
  }
  > span.session-message {
    word-wrap:break-word; 
    word-break:normal;
    float: left;
    max-width: 920px;
    margin: 20px 0 100px 0;
    padding: 20px;
    border-radius: 20px;
    background: #5cacde;
    color: #fff;
    font-size: 70px;
    position: relative;
    &:after {
      content: "";
      width: 0;
      height: 0;
      border: 25px solid transparent;
      border-right-color: #5cacde;
      position: absolute;
      left: -50px;
      top: 40px;
    }
  }
}
.session-chat-r {
  clear: both;
  padding: 50px 40px;
  box-sizing: border-box;
  > span.head-img {
    float: right;
    width: 170px;
    height: 170px;
    background: #ccc;
    border-radius: 50%;
    margin-left: 50px;
  }
  > span.session-message {
    float: right;
    max-width: 920px;
    margin: 20px 0 100px 0;
    padding: 20px;
    border-radius: 20px;
    background: #5cacde;
    color: #fff;
    font-size: 70px;
    position: relative;
    &:before {
      content: "";
      width: 0;
      height: 0;
      border: 25px solid transparent;
      border-left-color: #5cacde;
      position: absolute;
      right: -50px;
      top: 40px;
    }
  }
}
.time-tag {
  text-align: center;
  height:120px;
  line-height: 120px;
  color:#999;
  font-size: 60px;
}
</style>