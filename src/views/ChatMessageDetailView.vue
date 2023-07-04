<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const cookies = inject('$cookies')
const router = useRouter()
const chatMessageId = router.currentRoute.value.params.id
const chatMessageDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/chat/message/${chatMessageId}`, config).then((res) => {
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
    <div class="h5">Change Chat Message</div>
    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">uid</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.uid }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">chat_id</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.chat_id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">seq</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.seq }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">content</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.content }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">role</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.role }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">date</div>
        <div class="col-12 col-md-6">
          <VueDatePicker v-model="chatMessageDetail.date"></VueDatePicker>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.created_at }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">{{ chatMessageDetail.updated_at }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
.title {
  font-weight: 700;
}
@media (max-width: 600px) {
  .title {
    margin-bottom: 5px;
  }
}
</style>
