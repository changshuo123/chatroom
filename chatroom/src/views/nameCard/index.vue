<template>
    <!-- 搜索好友添加 好友信息  -->

    <div class="contain">
        <Header :title="title"/>
        <div class="msg-contain">
            <button class="btn" @click="beginChat">聊天</button>
            <button class="btn">添加好友</button>
        </div>
    </div>
</template>
<script>
import Header from '@/components/header'
export default {
    data(){
        return {
            title:this.$route.params.userId              
        }
    },
    components:{
        Header,
    },
    methods: {
        beginChat(){
            console.log(this.$route.params.userId)
            this.$router.push({
                name:'chatroom',
                params:{
                    userId:this.title
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
.msg-contain{
    width:100%;
    height:100%;
    .btn{
        width:80%;
        height:200px;
        border-radius: 20px;
        background: #0091e4;
        padding:30px;
        margin:0 auto;
    }
}
</style>