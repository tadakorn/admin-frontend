<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = router.currentRoute.value.params.id
const data = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/organization/${userId}`).then((res) => {
    data.value = {...res.data}
    data.value.preview_image = data.value.logo_url
    data.value.config = JSON.stringify(data.value.config, undefined, 2)
    data.value.created_at = dayjs
      .utc(data.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    data.value.updated_at = dayjs
      .utc(data.value.updated_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
  })
}

function onImageChange(e) {
  let files = e.target.files || e.dataTransfer.files
  if (files.length) {
    data.value.logo_url = files[0]
    data.value.preview_image = URL.createObjectURL(files[0])
  }
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
        <div class="col-12 col-md-6">{{ data.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.title" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">logo_url</div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-6">
              <img :src="data.preview_image" class="img-fluid" alt="Responsive Image" />
            </div>
            <div class="col-12">
              <label for="formFileDisabled" class="form-label"></label>
              <input
                class="form-control"
                type="file"
                id="formFileDisabled"
                v-on:change="onImageChange"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">config</div>
        <div class="col-12 col-md-6">
          <textarea rows="5" type="text" class="form-control" v-model="data.config" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">use_system_api_key</div>
        <div class="col-12 col-md-6">
          <input class="form-check-input" type="checkbox" v-model="data.use_system_api_key" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.created_at" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.updated_at" />
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
