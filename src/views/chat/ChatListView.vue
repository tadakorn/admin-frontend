<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref, inject } from 'vue'

const cookies = inject('$cookies')
const chatList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/chat/chat?page=1&page_size=100`, config).then((res) => {
    chatList.value = res.data.result
    chatList.value.forEach((chat) => {
      chat.publish_date = dayjs.utc(chat.publish_date).tz('Asia/Bangkok')
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
      <div class="h5">Chat</div>
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
              <th scope="col">title</th>
              <th scope="col">user_id</th>
              <th scope="col">seq</th>
              <th scope="col">message_count</th>
              <th scope="col">is_active</th>
              <th scope="col">is_published</th>
              <th scope="col">publish_date</th>
              <th scope="col">folder_id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="chat in chatList" :key="chat.id" @click="$router.push(`/chat/${chat.id}`)">
              <td>{{ chat.id }}</td>
              <td>{{ chat.uid }}</td>
              <td>{{ chat.title }}</td>
              <td>{{ chat.user_id }}</td>
              <td>{{ chat.seq }}</td>
              <td>{{ chat.message_count }}</td>
              <td class="text-center">
                <font-awesome-icon
                  v-if="chat.is_active"
                  icon="fa-solid fa-circle-check "
                  style="color: #3ec70b"
                />
                <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  v-if="chat.is_published"
                  icon="fa-solid fa-circle-check "
                  style="color: #3ec70b"
                />
                <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
              </td>
              <td>{{ chat.publish_date.format('YYYY-MM-DD HH:mm:ss') }}</td>
              <td>{{ chat.folder_id }}</td>
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
