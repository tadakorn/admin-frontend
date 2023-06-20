<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const promptList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/prompt?page=1&page_size=100`).then((res) => {
    promptList.value = res.data.result
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <!-- title -->
    <div class="">
      <div class="h5">Prompt</div>
      <div class="d-flex justify-content-between mt-4">
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
        <div>
          <button type="button" class="btn btn-success" @click="$router.push('/prompt/create')">
            Create
          </button>
        </div>
      </div>
    </div>
    <!-- info -->
    <div class="table-responsive mt-4 rounded-2">
      <table class="table table-hover info">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">detail</th>
            <th scope="col">prompt</th>
            <th scope="col">user_id</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="prompt in promptList"
            :key="prompt.id"
            @click="$router.push(`/prompt/${prompt.id}`)"
          >
            <td>{{ prompt.id }}</td>
            <td>{{ prompt.title }}</td>
            <td>{{ prompt.detail }}</td>
            <td>{{ prompt.prompt }}</td>
            <td>{{ prompt.user_id }}</td>
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
</style>
