<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const router = useRouter()
const chatMessageId = router.currentRoute.value.params.id
const chatMessageDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/message/${chatMessageId}`).then((res) => {
    chatMessageDetail.value = res.data
    chatMessageDetail.value.date = dayjs.utc(chatMessageDetail.value.date).tz('Asia/Bangkok')
    chatMessageDetail.value.created_at = dayjs
      .utc(chatMessageDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    chatMessageDetail.value.updated_at = dayjs
      .utc(chatMessageDetail.value.updated_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <div class="h5 pt-4">Chat Message {{ chatMessageDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ chatMessageDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">uid</td>
            <td>{{ chatMessageDetail.uid }}</td>
          </tr>
          <tr>
            <td scope="col">chat_id</td>
            <td>{{ chatMessageDetail.chat_id }}</td>
          </tr>
          <tr>
            <td scope="col">seq</td>
            <td>{{ chatMessageDetail.seq }}</td>
          </tr>
          <tr>
            <td scope="col">content</td>
            <td>{{ chatMessageDetail.content }}</td>
          </tr>
          <tr>
            <td scope="col">role</td>
            <td>{{ chatMessageDetail.role }}</td>
          </tr>
          <tr>
            <td scope="col">date</td>
            <VueDatePicker v-model="chatMessageDetail.date"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">created_at</td>
            <td>{{ chatMessageDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ chatMessageDetail.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
