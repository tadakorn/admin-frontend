<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'

const cookies = inject('$cookies')
const systemPersonaList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  console.log(config)
  axios.get(`${apiUrl}/v1/admin/system_persona?page=1&page_size=100`, config).then((res) => {
    systemPersonaList.value = res.data.result
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
      <div class="h5">System Persona</div>
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
        <button
          type="button"
          class="btn btn-success"
          @click="$router.push('/system-persona/create')"
        >
          Create
        </button>
      </div>
    </div>
    <!-- info -->
    <div class="table-responsive mt-4 rounded-2">
      <table class="table table-hover info">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">image_url</th>
            <th scope="col">prompt</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="systemPersona in systemPersonaList"
            :key="systemPersona.id"
            @click="$router.push(`/system-persona/${systemPersona.id}`)"
          >
            <td>{{ systemPersona.id }}</td>
            <td>{{ systemPersona.name }}</td>
            <td><img :src="systemPersona.image_url" style="height: 64px" /></td>
            <td>{{ systemPersona.prompt }}</td>
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
