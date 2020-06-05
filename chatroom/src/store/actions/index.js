import config from '../../config'
import cookie from '@/utils/cookie'
import { formatUserInfo } from './userinfo.js'
const SDK = require('@/sdk/' + config.sdk)
// console.log(SDK)
export default {
  connect({ state, commit, dispatch }, obj) {
    if (!state.nim) {
      let loginInfo = {
        uid: cookie.readCookie('uid'),
        sdktoken: cookie.readCookie('sdktoken'),
      }
      if (!loginInfo.uid) {
        // 无cookie，直接跳转登录页
        // pageUtil.turnPage('无历史登录记录，请重新登录', 'login')
        this.$router.push({
          name: 'login'
        })
      } else {
        // 有cookie，重新登录
        dispatch('initNimSDK', loginInfo)
      }
    }
  },
  // 初始化nim
  initNimSDK({ state, commit }, loginInfo) {
    if (state.nim) {
      state.nim.disconnect()
    }
    let uid = cookie.readCookie('uid')
    let sdktoken = cookie.readCookie('sdktoken')
    console.log(uid, sdktoken)
    window.nim = state.nim = SDK.NIM.getInstance({
      // debug: false, //
      appKey: config.appkey,
      account: uid,
      token: sdktoken,
      secure: true, //模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true
      db: false, //若不要开启数据库请设置false。SDK默认为true。
      onconnect: function onConnect(event) {
        console.log(1, event)
        if (loginInfo) {
          // 连接上以后更新uid
          commit('updateUserUID', loginInfo)
        }
      },
      ondisconnect: function onDisconnect(error) {
        console.log(2, error)
      }
    })
    console.log(nim)
  },
  //聊天室发送消息
  sendMsg({ state, commit }, obj) {
    const nim = state.nim
    obj = obj || {}
    let type = obj.type || ''
    // store.dispatch('showLoading')
    switch (type) {
      case 'text':
        nim.sendText({
          scene: obj.scene,
          to: obj.to,
          text: obj.text,
          done: onSendMsgDone,
          needMsgReceipt: obj.needMsgReceipt || false
        })
        break
      case 'custom':
        nim.sendCustomMsg({
          scene: obj.scene,
          to: obj.to,
          pushContent: obj.pushContent,
          content: JSON.stringify(obj.content),
          done: onSendMsgDone
        })
    }
  },
  //添加好友点击搜索
  searchUsers({ state, commit }, obj) {
    let { accounts, done } = obj
    const nim = state.nim
    if (!Array.isArray(accounts)) {
      accounts = [accounts]
    }
    nim.getUsers({
      accounts,
      done: function searchUsersDone(error, users) {
        if (error) {
          alert(error)
          return
        }
        commit('updateSearchlist', {
          type: 'user',
          list: users
        })
        let updateUsers = users.filter(item => {
          let account = item.account
          if (item.account === state.userUID) {   // 把自己的信息过滤掉
            return false
          }
          let userInfo = state.userInfos[account] || {}
          if (userInfo.isFriend) { // 判断是不是好友
            return false
          }
          return true
        })
        updateUsers = updateUsers.map(item => {
          return formatUserInfo(item)   // 处理用户信息 返回用户信息对象
        })
        commit('updateUserInfo', updateUsers)  // 更新用户信息
        if (done instanceof Function) {
          done(users)
        }
      }
    })
  },
  // 清空搜索页面更新显示列表
  resetSearchResult({ state, commit }) {
    commit('updateSearchlist', {
      type: 'user',
      list: []
    })
    commit('updateSearchlist', {
      type: 'team',
      list: []
    })
  }
}