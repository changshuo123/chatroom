<template>
  <!-- 聊天室 -->
  <div class="contain">
    <Header :title="title" />
    <div class="chat-main">
      <div class="chat-msg">
        <ul>
          <li>-已无更多记录-</li>
          <li>-time-</li>
        </ul>
        <ul class="session-main">
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-r">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
          <li class="session-chat-l">
            <span class="head-img"></span>
            <span class="session-message">你好</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <textarea class="ipt-talk"></textarea>
      <span><i class="iconfont">&#xe60b;</i></span>
      <span><i class="iconfont">&#xe620;</i></span>
      <span><i class="iconfont">&#xe607;</i></span>
      <span class="send">发 送</span>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/";
export default {
  data() {
    return {
      title: "聊天室"
    };
  },
  components: {
    Header
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.contain{
  display:flex;
  flex-direction:column;
}
.chat-main { 
  width: 100%;
  height: 100%;
  overflow: auto;
  flex:1;
  .chat-msg{
    width:100%;
    height:100%;

    > ul:nth-child(1) {
    li {
      padding: 50px 0;
      box-sizing: border-box;
      font-size: 60px;
      color: #ccc;
      text-align: center;
    }
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
    float: left;
    max-width: 920px;
    margin-top: 20px;
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
    margin-top: 20px;
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
.footer{
  width:100%;
  height:300px;
  box-shadow:0 0 10px 5px #aaa;
  span{
    display:inline-block;
    width:160px;
    transform: translate(0,-80px);
  }
  i{
    margin:0 10px;
    font-size: 120px;
    color:#666;
  }
  .send{
    display:inline-block;
    padding:20px;
    color:#fff;
    font-size:70px;
    background: #0091e4;
    border-radius: 20px;
    transform: translate(50px,-100px)
  }
}
.ipt-talk{
  width:900px;
  height:250px;
  margin: 10px 0 0 20px;
  border:1px solid #ccc;
  border-radius: 20px;
  font-size: 70px;
  margin-right: 50px;
}
</style>
