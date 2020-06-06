import store from '../'
export function setCurrSession({ state, commit, dispatch }, sessionId) {
    const nim = state.nim
    if (sessionId) {
        commit('updateCurrSessionId', {
            type: 'init',
            sessionId
        })
        if (nim) {
            // 如果在聊天页面刷新，此时还没有nim实例，需要在onSessions里同步
            nim.setCurrSession(sessionId)
            commit('updateCurrSessionMsgs', {
                type: 'init',
                sessionId
            })
            console.log(12346)
            // 发送已读回执
            dispatch('sendMsgReceipt')
        }
    }
}
