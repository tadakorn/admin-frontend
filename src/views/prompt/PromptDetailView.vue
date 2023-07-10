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
const promptDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.get(`${apiUrl}/v1/admin/prompt/${userId}`, config).then((res) => {
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

function deleteData() {
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios
    .delete(`${apiUrl}/v1/admin/prompt/${userId}`, config)
    .then((res) => {
      res.data
      router.push('/prompt')
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="container">
    <div class="h5">Change Prompt</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ promptDetail.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.title" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">detail</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.detail" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">prompt</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.prompt" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">user_id</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.user_id" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.created_at" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="promptDetail.updated_at" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between my-4">
      <button type="button" class="btn btn-danger" @click="deleteData">Delete</button>
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
