<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const router = useRouter()
const userId = router.currentRoute.value.params.id
const userDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/user/${userId}`).then((res) => {
    userDetail.value = res.data
    userDetail.value.verified_date = dayjs.utc(userDetail.value.verified_date).tz('Asia/Bangkok')
    userDetail.value.last_login = dayjs.utc(userDetail.value.last_login).tz('Asia/Bangkok')
    userDetail.value.last_access = dayjs.utc(userDetail.value.last_access).tz('Asia/Bangkok')
    userDetail.value.created_at = dayjs
      .utc(userDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    userDetail.value.updated_at = dayjs
      .utc(userDetail.value.updated_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <div class="h5 pt-4">User ID {{ userDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ userDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">email</td>
            <div>
              <input type="email" class="form-control" v-model="userDetail.email" />
            </div>
          </tr>
          <tr>
            <td scope="col">role</td>
            <div>
              <input type="email" class="form-control" v-model="userDetail.role" />
            </div>
          </tr>
          <tr>
            <td scope="col">organization</td>
            <td>{{ userDetail.organization }}</td>
          </tr>
          <tr>
            <td scope="col">is_active</td>
            <td>
              <input class="form-check-input" type="checkbox" v-model="userDetail.is_active" />
            </td>
          </tr>
          <tr>
            <td scope="col">is_verified</td>
            <td>
              <input class="form-check-input" type="checkbox" v-model="userDetail.is_verified" />
            </td>
          </tr>
          <tr>
            <td scope="col">verified_date</td>
            <VueDatePicker v-model="userDetail.verified_date"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">creator</td>
            <td>{{ userDetail.creator }}</td>
          </tr>
          <tr>
            <td scope="col">last_login</td>
            <VueDatePicker v-model="userDetail.last_login"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">last_access</td>
            <VueDatePicker v-model="userDetail.last_access"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">created_at</td>
            <td>{{ userDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ userDetail.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-danger btn-sm">Delete</button>
        <button type="button" class="btn btn-success btn-sm">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
