import obj from '../components/index'
export default {
  install(Vue) {
    Object.keys(obj).forEach(item => {
      Vue.component(item, obj[item])
    })
  }
}
