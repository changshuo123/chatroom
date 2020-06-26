import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/first',
      name: 'first',
      component: () => import("../views/firstpage/")
    },
    //登录
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/login/")
    },
    // 通讯录
    {
      path: '/mailList',
      name: 'mailList',
      component: () => import("../views/mailList/")
    },
    //聊天室
    {
      path: '/chatroom/:sessionId',
      name: 'chatroom',
      component: () => import("../views/chatroom/")
    },
    //添加好友
    {
      path: '/addFriend',
      name: 'addFriend',
      component: () => import("../views/addFriend/")
    },
    {
      path: '/nameCard/:sessionId',
      name: 'nameCard',
      component: () => import("../views/nameCard/")
    },
    {
      path: '/livevideo',
      name: 'livevideo',
      component: () => import("../views/livevideo/")
    },
    {
      path: '/my',
      name: 'my',
      component: () => import("../views/my/")
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
})
