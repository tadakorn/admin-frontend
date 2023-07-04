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
const userDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { Headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/user/${userId}`, config).then((res) => {
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
    <div class="h5">Change User</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ userDetail.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">email</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="userDetail.email" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">role</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="userDetail.role" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">organization_id</div>
        <div class="col-12 col-md-6">
          {{ userDetail.organization_id }}
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">is_active</div>
        <div class="col-12 col-md-6">
          <input class="form-check-input" type="checkbox" v-model="userDetail.is_active" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">is_verified</div>
        <div class="col-12 col-md-6">
          <input class="form-check-input" type="checkbox" v-model="userDetail.is_verified" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">verified_date</div>
        <div class="col-12 col-md-6">
          <VueDatePicker v-model="userDetail.verified_date"></VueDatePicker>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">creator_id</div>
        <div class="col-12 col-md-6">
          {{ userDetail.creator_id }}
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">last_login</div>
        <div class="col-12 col-md-6">
          <VueDatePicker v-model="userDetail.last_login"></VueDatePicker>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">last_access</div>
        <div class="col-12 col-md-6">
          <VueDatePicker v-model="userDetail.last_access"></VueDatePicker>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">
          {{ userDetail.created_at }}
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">
          {{ userDetail.updated_at }}
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
