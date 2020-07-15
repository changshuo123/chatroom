import store from '../'
import cookie from '../../utils/cookie'
import util from '../../utils'
import config from '../../config'
import Vue from 'vue'
const sessionStorage = window.sessionStorage
export default {
    // 链接sdk成功后设置userUID sdktoken
    updateUserUID(state, loginInfo) {
        state.userUID = loginInfo.uid
        state.sdktoken = loginInfo.sdktoken
        // cookie.setCookie('uid', loginInfo.uid)
        // cookie.setCookie('sdktoken', loginInfo.sdktoken)
        sessionStorage.setItem('uid',loginInfo.uid)
        sessionStorage.setItem('sdktoken',loginInfo.sdktoken)
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
            }
        })
        state.userInfos = util.mergeObject(state.userInfos, userInfos)
        console.log(state.userInfos)
    },
    // 更新追加消息，追加一条消息
    putMsg(state, msg) {
        let sessionId = msg.sessionId
        if (!state.msgs[sessionId]) {
            state.msgs[sessionId] = []
        }
        store.commit('updateMsgByIdClient', msg)
        let tempMsgs = state.msgs[sessionId]
        let lastMsgIndex = tempMsgs.length - 1
        if (tempMsgs.length === 0 || msg.time >= tempMsgs[lastMsgIndex].time) {
            tempMsgs.push(msg)
        } else {
            for (let i = lastMsgIndex; i >= 0; i--) {
                let currMsg = tempMsgs[i]
                if (msg.time >= currMsg.time) {
                    state.msgs[sessionId].splice(i, 0, msg)
                    break
                }
            }
        }
    },
    // 用idClient 更新消息，目前用于消息撤回
    updateMsgByIdClient(state, msgs) {
        if (!Array.isArray(msgs)) {
            msgs = [msgs]
        }
        let tempTime = (new Date()).getTime()
        msgs.forEach(msg => {
            // 有idClient 且 5分钟以内的消息
            if (msg.idClient && (tempTime - msg.time < 1000 * 300)) {
                state.msgsMap[msg.idClient] = msg
            }
        })
    },
    // 更新当前会话列表的聊天记录，包括历史消息、单聊消息等，不包括聊天室消息
    // replace: 替换idClient的消息
    updateCurrSessionMsgs(state, obj) {
        let type = obj.type || ''
        if (type === 'destroy') { // 清空会话消息
            state.currSessionMsgs = []
            state.currSessionLastMsg = null
            store.commit('updateCurrSessionId', {
                type: 'destroy'
            })
        } else if (type === 'init') { // 初始化会话消息列表
            if (state.currSessionId) {
                let sessionId = state.currSessionId
                let currSessionMsgs = [].concat(state.msgs[sessionId] || [])
                // 做消息截断
                let limit = config.localMsglimit
                let msgLen = currSessionMsgs.length
                if (msgLen - limit > 0) {
                    state.currSessionLastMsg = currSessionMsgs[msgLen - limit]
                    currSessionMsgs = currSessionMsgs.slice(msgLen - limit, msgLen)
                } else if (msgLen > 0) {
                    state.currSessionLastMsg = currSessionMsgs[0]
                } else {
                    state.currSessionLastMsg = null
                }
                state.currSessionMsgs = []
                let lastMsgTime = 0
                currSessionMsgs.forEach(msg => {
                    if ((msg.time - lastMsgTime) > 1000 * 60 * 5) {
                        lastMsgTime = msg.time
                        state.currSessionMsgs.push({
                            type: 'timeTag',
                            text: util.formatDate(msg.time, false)
                        })
                    }
                    state.currSessionMsgs.push(msg)
                })
                store.dispatch('checkTeamMsgReceipt', state.currSessionMsgs)
            }
        } else if (type === 'put') { // 追加一条消息
            let newMsg = obj.msg
            let lastMsgTime = 0
            let lenCurrMsgs = state.currSessionMsgs.length
            if (lenCurrMsgs > 0) {
                lastMsgTime = state.currSessionMsgs[lenCurrMsgs - 1].time
            }
            if (newMsg) {
                if ((newMsg.time - lastMsgTime) > 1000 * 60 * 5) {
                    state.currSessionMsgs.push({
                        type: 'timeTag',
                        text: util.formatDate(newMsg.time, false)
                    })
                }
                state.currSessionMsgs.push(newMsg)
                store.dispatch('checkTeamMsgReceipt', [newMsg])
            }
        } else if (type === 'concat') {
            // 一般用于历史消息拼接
            let currSessionMsgs = []
            let lastMsgTime = 0
            obj.msgs.forEach(msg => {
                if ((msg.time - lastMsgTime) > 1000 * 60 * 5) {
                    lastMsgTime = msg.time
                    currSessionMsgs.push({
                        type: 'timeTag',
                        text: util.formatDate(msg.time, false)
                    })
                }
                currSessionMsgs.push(msg)
            })
            currSessionMsgs.reverse()
            currSessionMsgs.forEach(msg => {
                state.currSessionMsgs.unshift(msg)
            })
            if (obj.msgs[0]) {
                state.currSessionLastMsg = obj.msgs[0]
            }
            store.dispatch('checkTeamMsgReceipt', currSessionMsgs)
        } else if (type === 'replace') {
            let msgLen = state.currSessionMsgs.length
            let lastMsgIndex = msgLen - 1
            if (msgLen > 0) {
                for (let i = lastMsgIndex; i >= 0; i--) {
                    if (state.currSessionMsgs[i].idClient === obj.idClient) {
                        state.currSessionMsgs.splice(i, 1, obj.msg)
                        break
                    }
                }
            }
        }
    },
    // 更新当前会话id，用于唯一判定是否在current session状态
    updateCurrSessionId(state, obj) {
        let type = obj.type || ''
        if (type === 'destroy') {
            state.currSessionId = null
        } else if (type === 'init') {
            if (obj.sessionId && (obj.sessionId !== state.currSessionId)) {
                state.currSessionId = obj.sessionId
            }
        }
    },
    // 发送消息 回执成功时执行
    updateSentReceipedMap(state, obj) {
        if (!obj || obj.length < 1) {
            return
        }
        var teamId = obj[0].teamId
        if (!state.sentReceipedMap[teamId]) {
            state.sentReceipedMap[teamId] = []
        }
        state.sentReceipedMap[teamId].push(...obj.map(msg => msg.idServer))
    },
    // 修改state receiptQueryList:群消息回执查询的消息列表
    updateReceiptQueryList(state, obj) {
        if (state.currReceiptQueryTeamId !== obj.teamId) {
            state.receiptQueryList = []
            state.teamMsgReads = []
            state.currReceiptQueryTeamId = obj.teamId
        }
        var needQuery = obj.msgs
            .filter(msg =>
                msg.needMsgReceipt && msg.from === state.myInfo.account && !state.receiptQueryList.find(item => item.idServer === msg.idServer)
            )
            .map(msg => {
                return {
                    teamId: obj.teamId,
                    idServer: msg.idServer
                }
            })
        if (needQuery.length > 0) {
            state.receiptQueryList.push(...needQuery)
        }
        if (needQuery.length > 0) {
            store.dispatch('getTeamMsgReads', needQuery)
        }
    },
    // 向state teamMsgReads:群消息回执查询结果列表
    updateTeamMsgReads(state, obj) {
        state.teamMsgReads.push(...obj.teamMsgReceipts)
    },
    
    updateSessions(state, sessions) {
        const nim = state.nim
        state.sessionlist = nim.mergeSessions(state.sessionlist, sessions)  // 合并会话    
        state.sessionlist.sort((a, b) => {
            return b.updateTime - a.updateTime
        })
        state.sessionlist.forEach(item => {
            state.sessionMap[item.id] = item
        })
    },
}