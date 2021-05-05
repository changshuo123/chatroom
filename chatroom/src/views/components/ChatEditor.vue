<template>
  <!-- 聊天室 底部 -->
  <div class="footer">
    <div class="footer-l">
      <textarea v-show="changetype" class="ipt-talk" v-model="msgToSent"></textarea>
      <!-- <div class="timer">time</div> -->
      <!-- 按住说话 -->
      <div
        v-show="!changetype"
        :class="['voice',{'active-voice':voiceColor == true}]"
        @mousedown="voiceDown" @mouseend.self="voiceEnd"
      >{{voiceText}}</div>
      <span v-show="voiceColor" class="cur-timer">{{timerText}}</span>
    </div>
    <div class="btn-chat-cont">
      <span>
        <i class="iconfont" @click="clickVoice">&#xe60b;</i>
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
      voiceText:'按住 说话',
      voiceColor: false,
      changetype: true,
      msgToSent: "",
      timerText: 0, // 按下时间
      timer: null,
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
    },
    clickVoice() {
      this.changetype = !this.changetype;
    },
    voiceDown() {
      clearInterval(this.timer)
      this.voiceColor = true;
      if(this.voiceColor){
        this.voiceText = '点击说话'
        this.timer = setInterval(() => {
          this.timerText++
          console.log(this.timerText)
        }, 1000);
      }else{
        this.voiceText = '点击发送'
      }
      // this.voiceColor = !this.voiceColor;
    },
    voiceEnd(){
      this.voiceColor = false;
      clearInterval(this.timer)
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
  .footer-l {
    width: 1000px;
    position: relative;
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
  .voice {
    width: 800px;
    height: 200px;
    margin: 50px 0 0 70px;
    border: 1px solid #ccc;
    border-radius: 200px;
    @extend %flexCenter;
    font-size: 60px;
  }
  .active-voice {
    background: #ccc;
  }
  .timer{
    width:400px;
    height:130px;
    border-radius: 50px;
    background: #ccc;
    position: absolute;
    top: -100px;
    left: 100px;
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
.cur-timer{
  padding: 10px 20px;
  border:1px solid #ccc;
  background: #f0f0f0;
  position: absolute;
  left: 350px;
  top: -130px;
}
</style>