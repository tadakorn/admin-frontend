<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import BooleanDisplay from '@/components/BooleanDisplay.vue'

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
    <div class="">
      <div class="h5">Organization</div>
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
        <button type="button" class="btn btn-success" @click="$router.push('/organization/create')">
          Create
        </button>
      </div>
      <!-- info -->
      <div class="table-responsive mt-4 rounded-2">
        <table class="table table-hover info">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">logo_url</th>
              <th scope="col">config</th>
              <th scope="col">use_system_api_key</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="organization in organizationList"
              :key="organization.id"
              @click="$router.push(`/organization/${organization.id}`)"
            >
              <td>{{ organization.id }}</td>
              <td>{{ organization.title }}</td>
              <td>
                <img
                  v-if="organization.logo_url"
                  :src="organization.logo_url"
                  style="height: 64px"
                />
              </td>
              <td>
                <pre>{{ organization.config }}</pre>
              </td>
              <td>
                <BooleanDisplay :isTrue="organization.use_system_api_key" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
pre {
  margin-bottom: 0;
}

.info {
  cursor: pointer;
  font-size: 14px;
}
/* Custom Styles */
.search-form {
  max-width: 50rem;
}
</style>
