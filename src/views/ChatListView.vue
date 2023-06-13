<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const chatList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/chat?page=1&page_size=100`).then((res) => {
    chatList.value = res.data.result
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
        <span class="fs-4">Chat</span>
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
          <tr v-for="chat in chatList" :key="chat.id">
            <td>{{ chat.id }}</td>
            <td>{{ chat.uid }}</td>
            <td>{{ chat.title }}</td>
            <td>{{ chat.user_id }}</td>
            <td>{{ chat.seq }}</td>
            <td>{{ chat.message_count }}</td>
            <td>
              <font-awesome-icon
                v-if="chat.is_active"
                icon="fa-solid fa-circle-check "
                style="color: #3ec70b"
              />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
            </td>
            <td>
              <font-awesome-icon
                v-if="chat.is_published"
                icon="fa-solid fa-circle-check "
                style="color: #3ec70b"
              />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
            </td>
            <td>{{ chat.publish_date }}</td>
            <td>{{ chat.folder_id }}</td>
          </tr>
        </tbody>
      </table>
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
