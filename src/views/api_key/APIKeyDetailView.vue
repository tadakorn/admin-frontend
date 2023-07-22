<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiKeyId = router.currentRoute.value.params.id
const apiUrl = import.meta.env.VITE_API_URL
const data = ref({})
const isError = ref({
  provider: false,
  api_key: false
})

function getData() {
  axios.get(`${apiUrl}/v1/admin/api-key/${apiKeyId}`).then((res) => {
    data.value = res.data
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

function updateData() {
  let isValid = true
  if (
    data.value.provider === '' ||
    data.value.provider === null ||
    data.value.provider === undefined
  ) {
    isError.value.provider = true
    isValid = false
  } else {
    isError.value.provider = false
  }

  if (
    data.value.api_key === '' ||
    data.value.api_key === null ||
    data.value.api_key === undefined
  ) {
    isError.value.api_key = true
    isValid = false
  } else {
    isError.value.api_key = false
  }
  if (isValid) {
    update()
  }
}

function update() {
  let postData = {
    provider: data.value.provider,
    api_key: data.value.api_key,
    org_key: data.value.org_key,
    organization_id: data.value.organization_id || null,
    is_system: data.value.is_system
  }

  axios
    .put(`${apiUrl}/v1/admin/api-key/${apiKeyId}`, postData)
    .then((res) => {
      res.data
      router.push('/api-key')
    })
    .catch((err) => {
      console.log(err)
    })
}

function deleteData() {
  axios
    .delete(`${apiUrl}/v1/admin/api-key/${apiKeyId}`)
    .then((res) => {
      res.data
      router.push('/api-key')
    })
    .catch((err) => {
      console.log(err)
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
        <div class="col-12 col-md-6">{{ data.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">provider<span style="color: red">*</span></div>
        <div class="col-12 col-md-3">
          <select class="form-select" v-model="data.provider">
            <option value="OPENAI">OpenAI</option>
            <option value="AZURE">Azure</option>
          </select>
          <div v-if="isError.provider" class="mt-2">
            <span class="error-message"><small>กรุณาระบุ provider</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">api_key<span style="color: red">*</span></div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.api_key" />
          <div v-if="isError.api_key" class="mt-2">
            <span class="error-message"><small>กรุณาระบุ api_key</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">org_key</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.org_key" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">organization_id</div>
        <div class="col-12 col-md-2">
          <input type="number" class="form-control" v-model="data.organization_id" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">{{ data.created_at }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">{{ data.updated_at }}</div>
      </div>
    </div>
    <div class="d-flex justify-content-between my-4">
      <button type="button" class="btn btn-danger" @click="deleteData">Delete</button>
      <button type="button" class="btn btn-success" @click="updateData">Save</button>
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

.error-message {
  color: #ff0000;
}
</style>
