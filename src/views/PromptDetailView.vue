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
const promptDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/prompt/${userId}`).then((res) => {
    promptDetail.value = res.data
    promptDetail.value.created_at = dayjs
      .utc(promptDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    promptDetail.value.updated_at = dayjs
      .utc(promptDetail.value.updated_at)
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
    <div class="h5 pt-4">prompt ID {{ promptDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ promptDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">title</td>
            <td>{{ promptDetail.title }}</td>
          </tr>
          <tr>
            <td scope="col">detail</td>
            <td>{{ promptDetail.detail }}</td>
          </tr>
          <tr>
            <td scope="col">prompt</td>
            <td>{{ promptDetail.prompt }}</td>
          </tr>

          <tr>
            <td scope="col">user_id</td>
            <td>{{ promptDetail.user_id }}</td>
          </tr>

          <tr>
            <td scope="col">created_at</td>
            <td>{{ promptDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ promptDetail.updated_at }}</td>
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
