import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

axios.interceptors.request.use(async (request) => {
  const store = useAuthStore()
  let accessToken = store.getAccessToken()
  if (!accessToken) {
    await store.refresh()
    accessToken = store.getAccessToken()
  }

  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
