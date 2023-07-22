import axios from 'axios'

import { useAuthStore } from '@/stores/auth'

axios.interceptors.request.use(
  async (request) => {
    const store = useAuthStore()
    const accessToken = store.getAccessToken()
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const config = error.config
    const store = useAuthStore()

    if (error.response.status === 401) {
      if (!config.sent) {
        config.sent = true

        const isSuccess = await store.refresh()
        if (isSuccess) {
          return axios(config)
        }
      } else {
        store.logout()
      }
    }
    return Promise.reject(error)
  }
)
