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
const chatMessagesId = router.currentRoute.value.params.id
const chatMessagesDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/message/${chatMessagesId}`).then((res) => {
    chatMessagesDetail.value = res.data
    chatMessagesDetail.value.date = dayjs.utc(chatMessagesDetail.value.date).tz('Asia/Bangkok')
    chatMessagesDetail.value.created_at = dayjs
      .utc(chatMessagesDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    chatMessagesDetail.value.updated_at = dayjs
      .utc(chatMessagesDetail.value.updated_at)
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
    <div class="h5 pt-4">User ID {{ chatMessagesDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ chatMessagesDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">uid</td>
            <td>{{ chatMessagesDetail.uid }}</td>
          </tr>
          <tr>
            <td scope="col">chat_id</td>
            <td>{{ chatMessagesDetail.chat_id }}</td>
          </tr>
          <tr>
            <td scope="col">seq</td>
            <td>{{ chatMessagesDetail.seq }}</td>
          </tr>
          <tr>
            <td scope="col">content</td>
            <td>{{ chatMessagesDetail.content }}</td>
          </tr>
          <tr>
            <td scope="col">role</td>
            <td>{{ chatMessagesDetail.role }}</td>
          </tr>
          <tr>
            <td scope="col">date</td>
            <VueDatePicker v-model="chatMessagesDetail.date"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">created_at</td>
            <td>{{ chatMessagesDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ chatMessagesDetail.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
        <button type="button" class="btn btn-success btn-sm">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
