<template>
  <!-- 聊天室 -->
  <div class="contain">
    <Header :title="title" />
    <ChatList :msglist="msglist" />
    <ChatEditor />
  </div>
</template>
<script>
import Header from "@/components/header/";
import utils from "@/utils/";
import ChatEditor from "../components/ChatEditor";
import ChatList from "../components/ChatList";
export default {
  data() {
    return {
      title: this.$route.params.sessionId,
      msgToSent: "",
      scene: "", //房间号
      to: "", //房间类型
      sessionId: this.$route.params.sessionId,
      // msglist:this.$store.state.currSessionMsgs
    };
  },
  components: {
    Header,
    ChatEditor,
    ChatList
  },
  mounted() {
    this.$store.dispatch("setCurrSession", this.sessionId);
    // console.log(666, this.$store.state.currSessionMsgs);
  },
  // methods: {},
  // updated: {
  //   sessionId() {
  //     let sessionId = this.$route.params.sessionId;
  //     return sessionId;
  //   }
  // },
  computed: {
    msglist() {
      let msg = this.$store.state.currSessionMsgs;
      return msg
    }
  }
};
</script>
<style scoped lang="scss">
.contain {
  display: flex;
  flex-direction: column;
}
</style>
