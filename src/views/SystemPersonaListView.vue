<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const systemPersonaList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios
    .get(
      `${apiUrl}/v1/admin/system_persona?page=1&page_size=100
`
    )
    .then((res) => {
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
    <div class="pt-4">
      <div class="py-4">
        <span class="fs-4">System Persona</span>
      </div>
      <div class="d-flex justify-content-between pb-4">
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
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="$router.push('/system-persona/create')"
          >
            Create
          </button>
        </div>
      </div>
      <!-- info -->
      <div class="table-responsive">
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

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
