import store from '../'
import util from '../../utils/index'
// 发送消息返回消息处理回调
export function onSendMsgDone(error, msg) {
    // store.dispatch('hideLoading')
    if (error) {
        // 被拉黑
        if (error.code === 7101) {
            msg.status = 'success'
            alert(error.message)
        } else {
            alert(error.message)
        }
    }
    onMsg(msg)
}
// 点击发送时成功后更新state 对方接受回调函数
export function onMsg(msg) {
    msg = formatMsg(msg)
    store.commit('putMsg', msg); // 更新追加msg
    if (msg.sessionId === store.state.currSessionId) {
        store.commit('updateCurrSessionMsgs', {  // 修改state CurrSessionMsgs
            type: 'put',
            msg
        })
        // 发送已读回执
        store.dispatch('sendMsgReceipt')
    }
    return
    if (msg.scene === 'team' && msg.type === 'notification') {  // scene是群组时触发
        store.dispatch('onTeamNotificationMsg', msg)
    }
}
//判断是否是机器人 返回机器人msg
export function formatMsg(msg) {
    const nim = store.state.nim
    if (msg.type === 'robot') {
        if (msg.content && msg.content.flag === 'bot') {
            if (msg.content.message) {
                msg.content.message = msg.content.message.map(item => {
                    switch (item.type) {
                        case 'template':
                            item.content = nim.parseRobotTemplate(item.content)
                            break
                        case 'text':
                        case 'image':
                        case 'answer':
                            break
                    }
                    return item
                })
            }
        }
    }
    return msg
}

// 发送消息已读回执
export function sendMsgReceipt({ state, commit }) {
    // 如果有当前会话
    let currSessionId = store.state.currSessionId
    if (currSessionId) {
        // 只有点对点消息才发已读回执
        if (util.parseSession(currSessionId).scene === 'p2p') {
            let msgs = store.state.currSessionMsgs
            const nim = state.nim
            if (state.sessionMap[currSessionId]) {
                nim.sendMsgReceipt({
                    msg: state.sessionMap[currSessionId].lastMsg,
                    done: function sendMsgReceiptDone(error, obj) {
                        // do something
                    }
                })
            }
        }
    }
}