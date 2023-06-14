<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const chatMessagesList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/message?page=1&page_size=100`).then((res) => {
    chatMessagesList.value = res.data.result
    chatMessagesList.value.forEach((chatMessages) => {
      chatMessages.date = dayjs.utc(chatMessages.date).tz('Asia/Bangkok')
    })
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <!-- title -->
    <div class="pt-4">
      <div class="d-flex justify-content-between py-4">
        <span class="fs-4">Chat Messages</span>
        <div class="search-form">
          <div class="input-group">
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-button"
            />
          </div>
        </div>
      </div>
      <!-- info -->
      <div class="table-responsive">
        <table class="table table-hover info">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">uid</th>
              <th scope="col">chat_id</th>
              <th scope="col">seq</th>
              <th scope="col">content</th>
              <th scope="col">role</th>
              <th scope="col">date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="chatMessages in chatMessagesList"
              :key="chatMessages.id"
              @click="$router.push(`/chat-messages/${chatMessages.id}`)"
            >
              <td>{{ chatMessages.id }}</td>
              <td>{{ chatMessages.uid }}</td>
              <td>{{ chatMessages.chat_id }}</td>
              <td>{{ chatMessages.seq }}</td>
              <td>{{ chatMessages.content }}</td>
              <td>{{ chatMessages.role }}</td>
              <td>{{ chatMessages.date.format('YYYY-MM-DD HH:mm:ss') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.info {
  cursor: pointer;
  font-size: 14px;
}
/* Custom Styles */
.search-form {
  max-width: 50rem;
}

.search-input {
  border-radius: 20px;
}
</style>
