<template>
  <!-- 聊天室 底部 -->
  <div class="footer">
    <div>
      <textarea class="ipt-talk" v-model="msgToSent"></textarea>
    </div>
    <div class="btn-chat-cont">
      <span>
        <i class="iconfont">&#xe60b;</i>
      </span>
      <span>
        <i class="iconfont">&#xe620;</i>
      </span>
      <span class="icon-file">
        <i class="iconfont">&#xe607;</i>
        <input type="file" class="file" ref="fileipt" @change="changeFile" />
      </span>
      <span>
        <div class="send" @click="sendFn">发送</div>
      </span>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/";
export default {
  props: {
    type: {
      type: String,
      default: "session"
    }
  },
  data() {
    return {
      msgToSent: ""
    };
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
      this.sessionId = this.$route.params.sessionId;
      this.scene = utils.parseSession(this.sessionId).scene; // 获取房间号动态路由截取字段
      this.to = utils.parseSession(this.sessionId).to; //获取动态路由type
      this.$store.dispatch("sendMsg", {
        type: "text",
        scene: "p2p",
        to: this.to,
        text: this.msgToSent
      });
      this.msgToSent = "";
      // console.log(this.$store.state.msgs);
      // console.log(this.$store.state.msgsMap);
      // console.log(this.$store.state.sessionlist);
      // console.log(this.$store.state.sessionMap);
    },
    changeFile(e) { 
      
      console.log(this.$refs.fileipt.value);
    }
  }
};
</script>
<style scoped lang="scss">
.footer {
  width: 100%;
  height: 300px;
  box-shadow: 0 -10px 10px 0px #aaa;
  display: flex;

  .btn-chat-cont {
    width: 750px;
    display: flex;
    margin-top: 100px;
    span {
      display: inline-block;
      width: 160px;
    }
    i {
      margin: 0 10px;
      font-size: 120px;
      color: #666;
    }
  }
  .send {
    width: 170px;
    padding: 20px;
    color: #fff;
    font-size: 70px;
    background: #0091e4;
    border-radius: 20px;
    text-align-last: justify;
    text-align: justify;
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
}
.icon-file {
  position: relative;
}
.file {
  width: 125px;
  height: 100px;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>