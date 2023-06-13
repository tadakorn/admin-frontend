<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const userList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/user?page=1&page_size=50`).then((res) => {
    userList.value = res.data.result
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
        <span class="fs-4">User</span>
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
            <th scope="col">email</th>
            <th scope="col">role</th>
            <th scope="col">organization</th>
            <th scope="col">is_active</th>
            <th scope="col">is_verified</th>
            <th scope="col">verified_date</th>
            <th scope="col">creator</th>
            <th scope="col">last_login</th>
            <th scope="col">last_access</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" @click="$router.push(`/user/${user.id}`)">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.organization }}</td>
            <td>
              <font-awesome-icon
                v-if="user.is_active"
                icon="fa-solid fa-circle-check "
                style="color: #3ec70b"
              />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
            </td>
            <td>
              <font-awesome-icon
                v-if="user.is_verified"
                icon="fa-solid fa-circle-check "
                style="color: #3ec70b"
              />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
            </td>
            <td>{{ user.verified_date }}</td>
            <td>{{ user.creator }}</td>
            <td>{{ user.last_login }}</td>
            <td>{{ user.ast_access }}</td>
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

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
