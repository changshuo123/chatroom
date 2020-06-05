import axios from 'axios'

let request = axios.create({
  baseURL: ''
})

request.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        ...config.headers
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const response = error.response
    const status = response.status
    if (status > 400) {
      switch (status) {
        case 401:
          break
        case 403:
          alert(403)
          break
      }
    }
    return Promise.reject(error)
  }
)

export default {
  get(url, data) {
    return request.get(url, {
      params: data
    })
  },
  post(url, data) {
    return request.post(url, data)
  }
}
