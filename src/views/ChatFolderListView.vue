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
    <div>
      <div class="h5">Chat Folder</div>
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
