<script setup>
import axios from 'axios'
import { onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const cookies = inject('$cookies')
const router = useRouter()
const userId = router.currentRoute.value.params.id
const organizationDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/organization/${userId}`, config).then((res) => {
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
    <div class="h5">Change Organization</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ organizationDetail.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organizationDetail.title" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">openai_org_key</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organizationDetail.openai_org_key" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">openai_api_key</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organizationDetail.openai_api_key" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organizationDetail.created_at" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organizationDetail.updated_at" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between my-4">
      <button type="button" class="btn btn-danger">Delete</button>
      <button type="button" class="btn btn-success">Save</button>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
.title {
  font-weight: 700;
}
@media (max-width: 600px) {
  .title {
    margin-bottom: 10px;
  }
}
</style>
