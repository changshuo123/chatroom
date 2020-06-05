import axios from 'axios'
// 服务器地址
const servicesUrl = {
  // 开发环境地址 npm run server
  development: {
    serverUrl: '',
    BIUrl:
      '/bi/Viewer?au_act=login&adminv=admin&passv=g5&platform=PC&refresh=yes'
  },
  // 生产环境地址 npm run online
  production: {
    serverUrl: '',
    BIUrl:
      '/bi/Viewer?au_act=login&adminv=admin&passv=g5&platform=PC&refresh=yes'
  },
  // 高检院服务地址 npm run build 调用
  online: {
    serverUrl: '',
    BIUrl:
      '/bi/Viewer?au_act=login&adminv=admin&passv=g5&platform=PC&refresh=yes'
  }
}
let _token = ''

if (window.external && external.AppCmd) {
  window.external.AppCmd(
    external.GetSID(window),
    '',
    'getUnion2Cookie',
    '',
    '',
    function(code, data) {
      _token = data
    }
  )
}
/**
 * 创建axios实例
 * */
const service = axios.create({
  baseURL: '',
  timeout: 30000,
  headers: {
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})
service.interceptors.request.use(
  config => {
    // config.headers.token = _token;
    config.headers.token = ''
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

async function request(config = {}) {
  let res = {}
  try {
    res = await service.request(config)
  } catch (e) {
    let errorText = ''
    switch (e.response && e.response.status) {
      case 404:
        errorText = '404 Not Found'
        break
      case 403:
        errorText = '无权限访问'
        break
      case 408:
        errorText = '服务器请求超时'
        break
      case undefined:
        errorText = '请检查请求配置是否正确'
        break
      default:
        errorText = '服务器请求超时'
    }
    res.data = {
      code: e.response && e.response.status,
      message: errorText
    }
  }
  return res.data
}

// export const BI_URL = servicesUrl[process.env.VUE_APP_TITLE].BIUrl
// export const SERVER_URL = servicesUrl[process.env.VUE_APP_TITLE].serverUrl

export default request
