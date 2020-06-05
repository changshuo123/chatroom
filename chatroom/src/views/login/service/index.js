import request from "@/utils/request";

//获取文书详情
export const loginfn = async (data) => await request({
    method: 'post',
    url: 'https://api.netease.im/nimserver/user/create.action',
    // header:{

    // },
    params: data
});