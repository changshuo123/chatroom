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
    <div class="chartBox" ref="chartBox">
      <ve-bar
        width="100%"
        height="100%"
        :data="chartData"
        :settings="chartSettings"
        :extend="extend"
      />
    </div>
    <div class="chartBox" :style="{float:'right'}" ref="chartBox">
      <veRadar
        width="100%"
        height="100%"
        :data="chartDatav"
        :settings="chartSettingsv"
        :extend="extendv"
      />
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import veBar from "v-charts/lib/bar.common";
import "v-charts/lib/style.css";
import "echarts/lib/component/title";
import "echarts/lib/component/markLine";
import "echarts/lib/component/dataZoom";

import veRadar from "v-charts/lib/radar.common";
export default {
  props: {},
  components: {
    veBar,
    veRadar,
  },
  data() {
    return {
      account: "", //账号
      password: "",
      errorMsg: "",
      chartData: {
        columns: ["name", "data2", "data3"],
        rows: [
          {
            data1: 90,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            data1: 100,
            data2: 200,
            data3: 300,
          },
        ],
      },
      chartSettings: {
        dimension: ["data1"],
        metrics: ["data1", "data2"],
        xAxisType: ["KMB", "percent"],
        // yAxisName: ["名称"],
        // axisSite:{
        //   top:['data3']
        // },
        // stack:{
        //   'xxx':['data2','data3']
        // },
        dataOrder: true,
        labelMap: {
          data1: "海鲜",
        },
        // itemStyle: {
        //   // borderType:'dotted',
        //   // borderWidth:5,
        //   label: {
        //     // position:'top'
        //     distance: 9,
        //   },
        // },
        series: {
          labels: [
            {
              position: "inside",
              show: true,
            },
            {
              position: "inside",
              show: true,
            },
          ],
        },
      },
      extend: {
          dataZoom: {
          type: "slider",
          show: true,
          start:1,
          end:100,
          yAxisIndex: [0],
          left:10,
          width:20,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          axisLabel: {
            // 改变X轴文字
            rotate: 0,
            color: "#f00",
            fontSize: 14,
          },
          axisTick: {
            // x轴刻度显示隐藏
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        xAxis: {
          name: "(元)",
          // nameLocation: "end",
          nameGap: 0, // 坐标轴名称离坐标轴位置
          inverse: false, // 正反向坐标轴
          // 0:{
          //   name:'(元)'
          // }
        },
        legend: {
          itemGap: 24,
          top: "auto",
          orient: "horizontal",
          left: "auto",
          bottom: "auto",
          itemHeight: 14,
          show: true,
          itemWidth: 30,
          right: 20,
          textStyle: {
            color: "#888",
            fontSize: 14,
          },
        },
        grid: {
          top: "10%",
          bottom: "10%",
          left: "10%",
          right: "10%",
        },
        backgroundColor: "#fff",
        extraCssText: "box-shadow:0px 2px 12px #b2c2e4",
        show: true,
        textStyle: {
          color: "#888",
          fontSize: 14,
          fontWeight: "bold", // 修改字体样式
        },
        title: {
          sublink: "",
          subtext: "",
          top: "18",
          left: "center",
          show: false,
          link: "",
          subtarget: "blank",
          text: "",
          textStyle: {
            color: "#4093ff",
            fontSize: 16,
          },
          subtextStyle: {
            color: "#aaa",
            fontSize: 12,
          },
          target: "blank",
        },
        series: {
          itemStyle: {
            barBorderRadius: 10,
          },
          barWidth: 10,
          barGap: "5%",
          z: 1,
          label: {
            show: true,
            // color:'#0f0',
            position: "inside",
          },
        },
      },
      chartDatav: {
        // dimension:['name'],
        // metrics:['data1','data2','data3'],
        columns: ["name", "data1", "data2", "data3"],
        rows: [
          {
            name: "北京",
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            name: "上海",
            data1: 100,
            data2: 200,
            data3: 300,
          },
          {
            name: "广州",
            data1: 100,
            data2: 200,
            data3: 300,
          },
        ],
      },
      chartSettingsv: {
        // dimension: ["data1"],
        // metrics: ["data1", "data2"],
        // xAxisType: ["KMB", "percent"],
        // xAxisName: ["名称", "数量"],
        // axisSite:{
        //   top:['data3']
        // },
        // stack:{
        //   'xxx':['data2','data3']
        // },
        // dataOrder: true,
        labelMap: {
          data1: "海鲜",
        },
        // itemStyle: {
        //   // borderType:'dotted',
        //   // borderWidth:5,
        //   label: {
        //     // position:'top'
        //     distance: 9,
        //   },
        // },
      },
      // 指标数据格式 max图标大小 坐标系颜色 显示标题 标题位置 图形颜色设置 提示框配置 图例相关 文本标签设置1显示文本2文本位置3文本字体大小  图标系列配置1线条样式2线条宽度3区域透明
      extendv: {
        // series: {
        //   barMaxWidth: 20,
        // },
        tooltip: {
          show: true,
        },
        // radar: {
        //   axisLine: {
        //     show: false,
        //   },
        //   splitLine: false,
        //   indicator: [
        //     {
        //       // text: "基础",
        //       max: 100,
        //       color: "#4d5459",
        //     },
        //     {
        //       // text: "投入",
        //       max: 100,
        //       color: "#4d5459",
        //     },
        //     {
        //       // text: "产出",
        //       max: 100,
        //       color: "#4d5459",
        //     },
        //     {
        //       // text: "绩效",
        //       max: 100,
        //       color: "#4d5459",
        //     },
        //   ],
        //   center: ["50%", "50%"],
        //   radius: 80,
        //   splitArea: {
        //     areaStyle: {
        //       color: ["#bdc0c2", "#d1d4d3", "#bdc0c2", "#d0d3d2", "#bfc2c4"],
        //     },
        //   },
        // },
        // legend: {
        //   itemGap: 24,
        //   top: "auto",
        //   orient: "horizontal",
        //   left: "auto",
        //   bottom: "auto",
        //   itemHeight: 14,
        //   show: true,
        //   itemWidth: 30,
        //   right: 20,
        //   textStyle: {
        //     color: "#888",
        //     fontSize: 14,
        //   },
        // },
        // grid: {
        //   top: "10%",
        //   bottom: "10%",
        //   left: "0",
        //   right: "10%",
        // },
        // backgroundColor: "#fff",
        // extraCssText: "box-shadow:0px 2px 12px #b2c2e4",
        // show: true,
        // textStyle: {
        //   color: "#888",
        //   fontSize: 14,
        //   fontWeight: "bold", // 修改字体样式
        // },
        // title: {
        //   sublink: "",
        //   subtext: "",
        //   top: "18",
        //   left: "center",
        //   show: false,
        //   link: "",
        //   subtarget: "blank",
        //   text: "",
        //   textStyle: {
        //     color: "#4093ff",
        //     fontSize: 16,
        //   },
        //   subtextStyle: {
        //     color: "#aaa",
        //     fontSize: 12,
        //   },
        //   target: "blank",
        // },
        // series: {
        //   itemStyle: {
        //     barBorderRadius: 10,
        //   },
        //   barWidth: 10,
        //   barGap: "5%",
        //   z: 1,
        //   label: {
        //     show: true,
        //     position: "right",
        //   },
        // },
      },
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
      let sessionStorage = window.sessionStorage;
      //设置假cookie
      // cookie.setCookie("uid", this.account.toLowerCase());
      // cookie.setCookie("sdktoken", sdktoken);
      sessionStorage.setItem("uid", this.account.toLowerCase());
      sessionStorage.setItem("sdktoken", sdktoken);
      this.$router.push({
        name: "first",
      });
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
    },
  },
  created() {},
  mounted() {},
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
.chartBox {
  width: 2000px;
  height: 2000px;
  border: 1px solid #ccc;
}
</style>