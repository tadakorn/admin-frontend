<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const apiKeyList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/api-key?page=1&page_size=100`).then((res) => {
    apiKeyList.value = res.data.result
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
      <div class="h5">API Key</div>
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
        <button type="button" class="btn btn-success" @click="$router.push('/api-key/create')">
          Create
        </button>
      </div>
      <!-- info -->
      <div class="table-responsive mt-4 rounded-2">
        <table class="table table-hover info">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">provider</th>
              <th scope="col">api_key</th>
              <th scope="col">org_key</th>
              <th scope="col">organization_id</th>
              <th scope="col">is_system</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="api_key in apiKeyList"
              :key="api_key.id"
              @click="$router.push(`/api-key/${api_key.id}`)"
            >
              <td>{{ api_key.id }}</td>
              <td>{{ api_key.provider }}</td>
              <td>{{ api_key.api_key }}</td>
              <td>{{ api_key.org_key }}</td>
              <td>{{ api_key.organization_id }}</td>
              <td>
                <font-awesome-icon
                  v-if="api_key.is_system"
                  icon="fa-solid fa-circle-check "
                  style="color: #3ec70b"
                />
                <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  font-size: 14px;
}

tbody tr {
  cursor: pointer;
}

.search-form {
  min-width: 10rem;
}
</style>
