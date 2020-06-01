import config from '../config'
export default {
    namespaced:true,
    state:{
        
    },
    mutations:{

    },
    actions:{
        connect (store, obj) {
            console.log(1)
            // const NIM = SDK.NIM.getInstance({
            // debug: false, //
            // appkey:config.appkey,
            // account: 'changshuo',
            // token: '123456',
            // db:true, //若不要开启数据库请设置false。SDK默认为true。
            // onconnect: function onConnect(event) {
            //     console.log(event)
            // },
            // ondisconnect: function onDisconnect(error) {
            //     console.log(error)
            //     }
            // })
            // console.log(NIM)
        }
    }
}