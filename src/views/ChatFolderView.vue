<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const chatFolderList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/folder?page=1&page_size=100`).then((res) => {
    chatFolderList.value = res.data
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
        <span class="fs-4">Chat Folder</span>
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
            <th scope="col">total</th>
            <th scope="col">page</th>
            <th scope="col">pages</th>
            <th scope="col">result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="chatFolder in chatFolderList" :key="chatFolder.id">
            <td>{{ chatFolder.total }}</td>
            <td>{{ chatFolder.page }}</td>
            <td>{{ chatFolder.pages }}</td>
            <td>{{ chatFolder.result }}</td>
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
