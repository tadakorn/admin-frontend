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
const systemPersonaId = router.currentRoute.value.params.id
const systemPersonaDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/system_persona/${systemPersonaId}`).then((res) => {
    systemPersonaDetail.value = res.data
    systemPersonaDetail.value.created_at = dayjs
      .utc(systemPersonaDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    systemPersonaDetail.value.updated_at = dayjs
      .utc(systemPersonaDetail.value.updated_at)
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
    <div class="h5 pt-4">System Persona {{ systemPersonaDetail.id }}</div>
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td scope="col">id</td>
            <td>{{ systemPersonaDetail.id }}</td>
          </tr>
          <tr>
            <td scope="col">name</td>
            <td>
              <input type="text" class="form-control" v-model="systemPersonaDetail.name" />
            </td>
          </tr>
          <tr>
            <td scope="col">image_url</td>
            <td>
              <div class="row">
                <div class="col-12 col-md-6">
                  <img
                    :src="systemPersonaDetail.image_url"
                    class="img-fluid"
                    alt="Responsive Image"
                  />
                </div>
                <div class="col-12">
                  <label for="formFileDisabled" class="form-label"></label>
                  <input class="form-control" type="file" id="formFileDisabled" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td scope="col">prompt</td>
            <td>
              <input type="text" class="form-control" v-model="systemPersonaDetail.prompt" />
            </td>
          </tr>
          <tr>
            <td scope="col">created_at</td>
            <td>{{ systemPersonaDetail.created_at }}</td>
          </tr>
          <tr>
            <td scope="col">updated_at</td>
            <td>{{ systemPersonaDetail.updated_at }}</td>
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
