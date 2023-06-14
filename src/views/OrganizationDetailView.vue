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
const organizationDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/organization/${userId}`).then((res) => {
    organizationDetail.value = res.data
    organizationDetail.value.created_at = dayjs
      .utc(organizationDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    organizationDetail.value.updated_at = dayjs
      .utc(organizationDetail.value.updated_at)
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
    <div class="h5 pt-4">organization ID {{ organizationDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ organizationDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">title</td>
            <td>{{ organizationDetail.title }}</td>
          </tr>
          <tr>
            <td scope="col">openai_org_key</td>
            <td>{{ organizationDetail.openai_org_key }}</td>
          </tr>
          <tr>
            <td scope="col">openai_api_key</td>
            <td>{{ organizationDetail.openai_api_key }}</td>
          </tr>

          <tr>
            <td scope="col">created_at</td>
            <td>{{ organizationDetail.created_at }}</td>
          </tr>

          <tr>
            <td scope="col">updated_at</td>
            <td>{{ organizationDetail.updated_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-danger btn-sm">Delete</button>
      <button type="button" class="btn btn-success btn-sm">Save</button>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
