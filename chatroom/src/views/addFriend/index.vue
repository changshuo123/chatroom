<template>
  <!-- 添加好友\群 -->
  <div class="contain">
    <header class="header">
      <div class="head-icon" @click="backOff">
        <i class="iconfont icon-xiangzuo"></i>
      </div>
      <div class="tab-header">
        <span
          :class="{'active':searchType===ind}"
          @click="headerTabFn(ind)"
          v-for="(item,ind) in headTabList"
          :key="ind"
        >{{item}}</span>
      </div>
      <div class="head-icon">
        <span></span>
      </div>
    </header>
    <div class="contain-main">
      <div class="ipt-cont">
        <input type="text" v-model="searchText" ref="searchInput" />
      </div>
      <button class="btn" @click="search">搜索</button>
      <div v-if="firstEntry">{{errMsg}}</div>
      <div>
        <div
          class="item-list"
          v-for="(item,ind) in searchList"
          :key="ind"
          @click="clickListFn(item.account)"
        >
          <img :src="item.avatar" alt />
          <span>账号:{{item.account}}</span>
          <span>名字:{{item.nick}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchType: 0,
      headTabList: ["搜索用户", "搜索群"],
      searchText: "",
      searchList: [],
      errMsg: "",
      firstEntry: false //控制watch监听显示无记录
    };
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      console.log(this.$route.params);
      //   this.searchType = parseInt(this.$route.params.searchType); // 进入搜索页面路由信息可以携带默认搜索类型
      this.$store.dispatch("resetSearchResult");
    });
    setTimeout(() => {
      // 立即focus会引起切页时白屏，故增加timeout
      this.$refs.searchInput.focus();
    }, 500);
  },
  methods: {
    headerTabFn(ind) {
      this.searchText = "";
      if (ind === 0) {
        this.searchType = 0;
      } else {
        this.searchType = 1;
      }
    },
    backOff() {
      this.$router.back();
    },
    search() {
      if (!this.searchText) {
        alert("未输入内容");
        return;
      }
      this.firstEntry = true;
      if (this.searchType === 1) {
        if (!/^(\d){4,9}$/.test(this.searchText)) {
          alert("输入的群号非法");
          return;
        }
        this.$store.dispatch("searchTeam", {
          teamId: this.searchText
        });
      } else if (this.searchType === 0) {
        console.log(this.$store.state.userUID)
        if (this.searchText === this.$store.state.userUID) {
          this.searchList = [];
          this.errMsg = "别看了，就是你自己！";
        } else {
          this.errMsg = "";
          this.$store.dispatch("searchUsers", {
            accounts: [this.searchText]
          });
        }
      }
    },
    clickListFn(account) {
      this.$router.push({
        name: "nameCard",
        params:{
          sessionId:account,
        }
      });
    }
  },
  watch: {
    searchResult(val, oldVal) {
      // watch 监听 computed计算属性
      console.log(val, oldVal);
      if (val.length === 0 && !this.firstEntry) {
        this.errMsg = "无记录";
      } else {
        this.errMsg = "";
      }
      this.searchList = val;
      console.log(this.searchList[0]);
    },
    searchType() {
      this.$refs.searchInput.focus();
    }
  },
  computed: {
    searchResult() {
      // 监听
      let result = [];
      if (this.searchType === 1) {
        result = this.$store.state.searchedTeams.map(item => {
          item.avatar = item.avatar || config.defaultUserIcon;
          item.link = `/teamcard/${item.teamId}`;
          return item;
        });
      } else if (this.searchType === 0) {
        console.log(this.$store.state.searchedUsers)
        result = this.$store.state.searchedUsers.map(item => {
          //处理搜索列表结果
          item.nick = item.nick || item.account;
          item.link = `/namecard/${item.account}`;
          item.avatar = item.avatar || config.defaultUserIcon;
          return item;
        });
      }
      return result;
    }
  }
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
}
.tab-header {
  width: 700px;
  height: 130px;
  margin-top: 30px;
  border: 6px solid #0091e4;
  border-radius: 65px;
  overflow: hidden;
  display: flex;

  > span {
    width: 50%;
    @extend %flexCenter;
    font-size: 60px;
  }

  > span.active {
    background: #0091e4;
    color: #fff;
  }
}
.contain-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  flex: 1;

  .ipt-cont {
    display: flex;
    justify-content: center;
    > input {
      display: block;
      width: 90%;
      margin-top: 100px;
      padding: 30px 0;
      border: 6px solid #ccc;
    }
  }
}
.btn {
  display: block;
  width: 90%;
  height: 200px;
  margin: 50px auto;
}
.item-list {
  > img {
    width: 150px;
  }
}
</style>