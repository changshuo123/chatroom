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
      <textarea class="ipt-talk" v-model="msgToSent"></textarea>
      <span>
        <i class="iconfont">&#xe60b;</i>
      </span>
      <span>
        <i class="iconfont">&#xe620;</i>
      </span>
      <span>
        <i class="iconfont">&#xe607;</i>
      </span>
      <span class="send" @click="sendFn">发 送</span>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/";
import utils from "@/utils/";
export default {
  data() {
    return {
      title: this.$route.params.userId,
      msgToSent: "",
      scene: "", //房间号
      to: "", //房间类型
      sessionId:this.$route.params.userId
    };
  },
  components: {
    Header
  },
  mounted(){
    this.$store.dispatch('setCurrSession', this.sessionId)
    console.log(666,this.$store.state.currSessionMsgs)
  },
  methods: {
    sendFn() {
      if (/^\s*$/.test(this.msgToSent)) {
        alert("请不要发送空消息");
        return;
      } else if (this.msgToSent.length > 800) {
        alert("请不要超过800个字");
        return;
      }
      this.msgToSent = this.msgToSent.trim();
      let atUsers = this.msgToSent.match(/@[^\s@$]+/g); //判断前面是否有@
      // console.log(atUsers);
      // 以@开头
      // if (atUsers) {
      //   for (let i = 0; i < atUsers.length; i++) {
      //     let item = atUsers[i].replace('@', '')
      //     console.log(this.robotInfosByNick)
      //     if (this.robotInfosByNick[item]) {
      //       robotAccid = this.robotInfosByNick[item].account
      //       robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
      //       break
      //     }
      //   }
      // }
      this.sessionId = this.$route.params.userId;
      this.scene = utils.parseSession(this.sessionId).scene; // 获取房间号动态路由截取字段
      this.to = utils.parseSession(this.sessionId).to; //获取动态路由type
      this.$store.dispatch("sendMsg", {
        type: "text",
        scene: "p2p",
        to: this.to,
        text: this.msgToSent
      });
    }
  }
  // updated:{
  //   robotInfosByNick () {
  //     return this.$store.state.robotInfosByNick
  //   },
  // }
};
</script>
<style scoped lang="scss">
.contain {
  display: flex;
  flex-direction: column;
}
.chat-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  flex: 1;
  .chat-msg {
    width: 100%;
    height: 100%;

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
.footer {
  width: 100%;
  height: 300px;
  box-shadow: 0 0 10px 5px #aaa;
  span {
    display: inline-block;
    width: 160px;
    transform: translate(0, -80px);
  }
  i {
    margin: 0 10px;
    font-size: 120px;
    color: #666;
  }
  .send {
    display: inline-block;
    padding: 20px;
    color: #fff;
    font-size: 70px;
    background: #0091e4;
    border-radius: 20px;
    transform: translate(50px, -100px);
  }
}
.ipt-talk {
  width: 900px;
  height: 250px;
  margin: 10px 0 0 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 70px;
  margin-right: 50px;
}
</style>
