<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const cookies = inject('$cookies')
const userList = ref([])
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/user?page=1&page_size=50`, config).then((res) => {
    userList.value = res.data.result
    userList.value.forEach((user) => {
      user.last_login = dayjs.utc(user.last_login).tz('Asia/Bangkok')
      user.last_access = dayjs.utc(user.last_access).tz('Asia/Bangkok')
    })
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
      <div class="h5">User</div>
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
        <button type="button" class="btn btn-success" @click="$router.push('/user/create')">
          Create
        </button>
      </div>
      <!-- info -->
      <div class="table-responsive mt-4 rounded-2">
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
              <td class="text-center">
                <font-awesome-icon
                  v-if="user.is_active"
                  icon="fa-solid fa-circle-check "
                  style="color: #3ec70b"
                />
                <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  v-if="user.is_verified"
                  icon="fa-solid fa-circle-check "
                  style="color: #3ec70b"
                />
                <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
              </td>
              <td>{{ user.verified_date }}</td>
              <td>{{ user.creator }}</td>
              <td>{{ user.last_login.format('YYYY-MM-DD HH:mm:ss') }}</td>
              <td>{{ user.last_access.format('YYYY-MM-DD HH:mm:ss') }}</td>
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

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
