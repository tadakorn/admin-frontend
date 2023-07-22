import { inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import dayjs from 'dayjs'

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const cookies = inject('$cookies')

  function getAccessToken() {
    return cookies.get('accessToken')
  }

  function getRefreshToken() {
    return cookies.get('refreshToken')
  }

  function isAuthenticated() {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      return true
    } else {
      return false
    }
  }
  async function refresh() {
    const refreshToken = getRefreshToken()
    let postData = { refresh_token: refreshToken } //รับ value จาก backend
    let customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(
      `${apiUrl}/v1/auth/token/refresh`,
      JSON.stringify(postData),
      customConfig
    )
    cookies.set('accessToken', res.data.access_token, dayjs.unix(res.data.expires_at).toDate())
  }
  return { isAuthenticated, refresh, getAccessToken, getRefreshToken }
})
