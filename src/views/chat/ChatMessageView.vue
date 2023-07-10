<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref, inject } from 'vue'

const cookies = inject('$cookies')
const chatMessageList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/chat/message?page=1&page_size=100`, config).then((res) => {
    chatMessageList.value = res.data.result
    chatMessageList.value.forEach((chatMessage) => {
      chatMessage.date = dayjs.utc(chatMessage.date).tz('Asia/Bangkok')
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
    <div>
      <div class="h5">Chat Message</div>
      <div class="mt-4">
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
      <div class="table-responsive mt-4 rounded-2">
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
              v-for="chatMessage in chatMessageList"
              :key="chatMessage.id"
              @click="$router.push(`/chat-message/${chatMessage.id}`)"
            >
              <td>{{ chatMessage.id }}</td>
              <td>{{ chatMessage.uid }}</td>
              <td>{{ chatMessage.chat_id }}</td>
              <td>{{ chatMessage.seq }}</td>
              <td>{{ chatMessage.content }}</td>
              <td>{{ chatMessage.role }}</td>
              <td>{{ chatMessage.date.format('YYYY-MM-DD HH:mm:ss') }}</td>
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

@media (max-width: 600px) {
  .search-form {
    width: 70%;
  }
}

/* Media query for devices with a minimum width of 601px and maximum width of 1200px */
@media (min-width: 601px) and (max-width: 1200px) {
  .search-form {
    width: 50%;
  }
}

/* Media query for devices with a minimum width of 1201px */
@media (min-width: 1201px) {
  .search-form {
    width: 20%;
  }
}
</style>
