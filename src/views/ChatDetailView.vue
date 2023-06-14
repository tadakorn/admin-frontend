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
const chatId = router.currentRoute.value.params.id
const chatDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/chat/${chatId}`).then((res) => {
    chatDetail.value = res.data
    chatDetail.value.created_at = dayjs
      .utc(chatDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    chatDetail.value.updated_at = dayjs
      .utc(chatDetail.value.updated_at)
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
    <div class="h5 pt-4">chat ID {{ chatDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ chatDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">uid</td>
            <td>{{ chatDetail.uid }}</td>
          </tr>
          <tr>
            <td scope="col">title</td>
            <td>{{ chatDetail.title }}</td>
          </tr>
          <tr>
            <td scope="col">user_id</td>
            <td>{{ chatDetail.user_id }}</td>
          </tr>
          <tr>
            <td scope="col">seq</td>
            <td>{{ chatDetail.seq }}</td>
          </tr>
          <tr>
            <td scope="col">message_count</td>
            <td>{{ chatDetail.message_count }}</td>
          </tr>
          <tr>
            <td scope="col">is_active</td>
            <td>
              <input class="form-check-input" type="checkbox" v-model="chatDetail.is_active" />
            </td>
          </tr>
          <tr>
            <td scope="col">is_published</td>
            <td>
              <input class="form-check-input" type="checkbox" v-model="chatDetail.is_published" />
            </td>
          </tr>
          <tr>
            <td scope="col">publish_date</td>

            <VueDatePicker v-model="chatDetail.publish_date"></VueDatePicker>
          </tr>
          <tr>
            <td scope="col">folder_id</td>
            <div>
              <input type="number" class="form-control" v-model="chatDetail.folder_id" />
            </div>
          </tr>
          <tr>
            <td scope="col">created_at</td>
            <td>{{ chatDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ chatDetail.updated_at }}</td>
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
