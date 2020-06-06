import store from '../'
// 初始化会话消息列表时
export function checkTeamMsgReceipt({ state }, msgs) {
    var result = /team-(\d+)/.exec(state.currSessionId)
    if (!result) {
        return null
    }
    var teamId = result[1]

    var needToPeceiptList = getMsgNeedToReceipt(state, teamId, msgs)
    if (needToPeceiptList && needToPeceiptList.length > 0) {
        nim.sendTeamMsgReceipt({
            teamMsgReceipts: needToPeceiptList,
            done: (err, obj, content) => {
                console.log('标记群组消息已读' + (!err ? '成功' : '失败'));
                if (!err) {
                    store.commit('updateSentReceipedMap', needToPeceiptList)
                }
            }
        })
    }

    store.commit('updateReceiptQueryList', {
        teamId: teamId,
        msgs: msgs
    })
}
// 查询需要发送回执的消息
function getMsgNeedToReceipt(state, teamId, msgs) {
    var sentReceipedList = state.sentReceipedMap[teamId] || []
    var needToReceipt = msgs.filter(msg => {
        // 需要回执，且未发送过
        return msg.needMsgReceipt && msg.from !== state.myInfo.account && !sentReceipedList.find(id => id === msg.idServer)
    }).map(msg => {
        return {
            teamId: teamId,
            idServer: msg.idServer
        }
    })
    return needToReceipt
}
// 修改updateTeamMsgReads:
export function getTeamMsgReads({ state }, needQuery) {
    nim.getTeamMsgReads({
        teamMsgReceipts: needQuery,
        done: (error, obj, content) => {
            if (error) {
                console.log('获取群组消息已读' + error)
            } else {
                console.log('获取群组消息已读：', content)
                store.commit('updateTeamMsgReads', content) //向state teamMsgReads添加信息
            }
        }
    })
}
