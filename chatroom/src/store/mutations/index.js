import store from '../'
import cookie from '../../utils/cookie'
import util from '../../utils'
import config from '../../configs'
import Vue from 'vue'
export default {
    // 链接sdk成功后设置userUID sdktoken
    updateUserUID(state, loginInfo) {
        state.userUID = loginInfo.uid
        state.sdktoken = loginInfo.sdktoken
        cookie.setCookie('uid', loginInfo.uid)
        cookie.setCookie('sdktoken', loginInfo.sdktoken)
    },
    // 更新search结果列表
    updateSearchlist(state, obj) {
        const type = obj.type
        switch (type) {
            case 'user':
                if (obj.list.length !== 0 || state.searchedUsers.length !== 0) {
                    state.searchedUsers = obj.list
                    console.log(state.searchedUsers)
                } else {
                    state.searchedUsers = []
                }
                break
            case 'team':
                if (obj.list.length !== 0 || state.searchedTeams.length !== 0) {
                    state.searchedTeams = obj.list
                } else {
                    state.searchedTeams = []
                }
                break
        }
    },
    // 更新用户信息
    updateUserInfo(state, users) {
        let userInfos = state.userInfos
        users.forEach(user => {
            let account = user.account
            if (account) {
                userInfos[account] = util.mergeObject(userInfos[account], user)
                console.log(userInfos)
            }
        })
        state.userInfos = util.mergeObject(state.userInfos, userInfos)
        console.log(state.userInfos)
    },
}