import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/first',
      name: 'first',
      component: ()=>import("../views/firstpage/")
    },
    // 通讯录
    {
        path: '/mailList',
        name: 'mailList',
        component: ()=>import("../views/mailList/")
    },
    //聊天室
    {
        path: '/chatroom',
        name: 'chatroom',
        component: ()=>import("../views/chatroom/")
    },
    {
        path: '/livevideo',
        name: 'livevideo',
        component: ()=>import("../views/livevideo/")
    },
    {
        path: '/my',
        name: 'my',
        component: ()=>import("../views/my/")
    },
    {
        path:"/",
        redirect:"/first"
    }
  ]
})
