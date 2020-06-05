<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
const sessionHistory = window.sessionStorage
export default {
  name: 'App',
  watch:{
    '$route' (to, from) {
      if (to && from) {
        let toPath = to.path
        let fromPath = from.path
        let count = parseInt(sessionHistory.getItem('count'))
        // 如果是导航页或者没有初始记录
        if (Number.isNaN(count)) {
          count = 1
          // this.transitionName = 'forward'
        } else {
          count += 1
          let fromCount = parseInt(sessionHistory.getItem(fromPath))
          let toCount = parseInt(sessionHistory.getItem(toPath))
          // if (toCount < fromCount && fromCount < count && (!pageUtil.showNav(fromPath))) {
          if (toCount < fromCount && fromCount < count ) {
            // this.transitionName = 'backward'
            count = toCount
          } else {
            // this.transitionName = 'forward'
          }
          // if (pageUtil.showNav(toPath)) {
          //   count = 1
          // }
        }
        sessionHistory.setItem(toPath, count)
        sessionHistory.setItem('count', count)
      }
    }
  },
  updated(){
    // console.log(this.$store)
    this.$store.dispatch('connect')
  }
}
</script>

<style>
body,#app{
  width:100%;
  height:100%;
  box-sizing: border-box;
}
.contain{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
}
</style>
