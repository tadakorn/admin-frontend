import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import axiosPublic from '@/api/axiosPublic'

export const useAuthStore = defineStore('auth', () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const cookies = inject('$cookies')
  const router = useRouter()

  function getAccessToken() {
    return cookies.get('accessToken')
  }

  function getRefreshToken() {
    return cookies.get('refreshToken')
  }

  function isAuthenticated() {
    const refreshToken = cookies.get('refreshToken')
    if (refreshToken) {
      return true
    } else {
      return false
    }
  }

  function logout() {
    cookies.remove('accessToken')
    cookies.remove('refreshToken')
    router.push('/login')
  }

  async function refresh() {
    const refreshToken = getRefreshToken()
    let postData = { refresh_token: refreshToken } //รับ value จาก backend
    let customConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axiosPublic.post(
        `${apiUrl}/v1/auth/token/refresh`,
        JSON.stringify(postData),
        customConfig
      )
      cookies.set('accessToken', res.data.access_token, dayjs.unix(res.data.expires_at).toDate())
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return { getAccessToken, getRefreshToken, isAuthenticated, refresh, logout }
})
