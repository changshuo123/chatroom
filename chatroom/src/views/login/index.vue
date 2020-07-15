<template>
  <div class="contain">
    登录
    <div class="log-main">
      <input type="text" class="ipt-account" maxlength="20" v-model="account" placeholder="请输入帐号" />
      <input type="text" class="ipt-password" maxlength="20" v-model="password" placeholder="请输入帐号" />
      <div>{{errorMsg}}</div>
    </div>
    <div>
      <button @click="signIn">登录</button>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import { loginfn } from "./service/index";
// const crypto = require("crypto");
// const fs = require("fs");
// import md5 from "@/utils/md5";
// import cookie from "@/utils/cookie";
export default {
  props: {},
  components: {},
  data() {
    return {
      account: "", //账号
      password: "",
      errorMsg: ""
    };
  },
  computed: {},
  methods: {
    signIn() {
      if (this.account === "") {
        this.errorMsg = "帐号不能为空";
        return;
      } else if (this.password === "") {
        this.errorMsg = "密码不能为空";
        return;
      } else if (this.password.length < 6) {
        this.errorMsg = "密码至少需要6位";
        return;
      }
      // let sdktoken = md5(this.password);//这里不做加密处理否则请求不成功
      // 真实登录需请求三个接口 login获取动态token用来携带headers头 userInfo获取用户信息渲染我的页面 router获取路由信息做权限验证
      let sdktoken = this.password; 
      let sessionStorage = window.sessionStorage
      //设置假cookie 
      // cookie.setCookie("uid", this.account.toLowerCase()); 
      // cookie.setCookie("sdktoken", sdktoken);
      sessionStorage.setItem('uid',this.account.toLowerCase())
      sessionStorage.setItem('sdktoken',sdktoken)
      this.$router.push({
        name:'first'
      })
      // 向服务器请求获取通信uid,token时414
      //   let date = new Date().getTime()
      //   console.log(date)
      //   const appSecret = "3be68b3db6b8";
      //   const random = "6545654231";
      //   const secret_key = "c";
      //   const UTCData = '2020-6-05T06:8:58.000Z'
      //   const str = appSecret + random + date;
      //   const hash = crypto
      //     .createHmac("sha1", secret_key)
      //     .update(str)
      //     .digest("hex");
      //   fetch("https://api.netease.im/nimserver/user/create.action", {
      //     method: "POST",
      //     headers: {
      //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      //       AppKey: "15a95f41a8b829fea65aaaaba8f0dba4",
      //       Nonce: 123456, //随机数
      //       CurTime: UTCData,
      //       CheckSum: hash
      //     }
      //   })
      //     .then(response => response.json())
      //     .then(json => console.log(json));
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.log-main {
  width: 100%;
  > input {
    width: 80%;
    height: 100px;
    border: 6px solid #ccc;
  }
}
</style>