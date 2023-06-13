<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const organizationList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/organization?page=1&page_size=100`).then((res) => {
    organizationList.value = res.data.result
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
        <span class="fs-4">Organization</span>
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
              <th scope="col">title</th>
              <th scope="col">openai_org_key</th>
              <th scope="col">openai_api_key</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="organization in organizationList" :key="organization.id">
              <td>{{ organization.id }}</td>
              <td>{{ organization.title }}</td>
              <td>{{ organization.openai_org_key }}</td>
              <td>{{ organization.openai_api_key }}</td>
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
