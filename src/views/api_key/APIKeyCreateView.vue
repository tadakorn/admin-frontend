<script setup>
import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const cookies = inject('$cookies')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const data = ref({
  provider: "",
  api_key: null,
  org_key: null,
  organization_id: null,
  is_system: false
})
const isError = ref({
  provider: false,
  api_key: false
})

function createAPIKey() {
  let isValid = true
  if (data.value.provider === '' || data.value.provider === null || data.value.provider === undefined) {
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
    create()
  }
}

function create() {
  let postData = {
    provider: data.value.provider,
    api_key: data.value.api_key,
    org_key: data.value.org_key,
    organization_id: data.value.organization_id,
    is_system: data.value.is_system
  }
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.post(`${apiUrl}/v1/admin/api-key`, postData, config).then((res) => {
    res.data
    router.push('/api-key')
  })
}
</script>

<template>
  <div class="container">
    <div class="h5">Create API Key</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">provider<span style="color: red">*</span></div>
        <div class="col-12 col-md-3">
          <select class="form-select" v-model="data.provider">
            <option value="">-</option>
            <option value="OPENAI">OpenAI</option>
            <option value="AZURE">Azure</option>
          </select>
          <div v-if="isError.provider" class="mt-2">
            <span class="custom-color"><small>กรุณาระบุ provider</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">api_key<span style="color: red">*</span></div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="data.api_key" />
          <div v-if="isError.api_key" class="mt-2">
            <span class="custom-color"><small>กรุณาระบุ api_key</small></span>
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
        <div class="col-12 col-md-2 title">is_system</div>
        <div class="col-12 col-md-6">
          <input type="checkbox" class="form-check-input" v-model="data.is_system" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end my-4">
      <button type="button" class="btn btn-success" @click="createAPIKey">Create</button>
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
.custom-color {
  color: #ff0000;
}
</style>
