<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import defaultImage from '../../assets/default.jpg'

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const organization = ref({
  title: null,
  preview_logo: null,
  logo: null,
  config: null,
  openai_org_key: null,
  openai_api_key: null
})

const isError = ref({ title: false })

function createOrganization() {
  let isValid = true
  if (
    organization.value.title === '' ||
    organization.value.title === null ||
    organization.value.title === undefined
  ) {
    isError.value.title = true
    isValid = false
  } else {
    isError.value.title = false
  }

  if (isValid) {
    create()
  }
}
function onImageChange(e) {
  let files = e.target.files || e.dataTransfer.files
  if (!files.length) {
    organization.value.logo = null
  } else {
    organization.value.logo = files[0]
    organization.value.preview_logo = URL.createObjectURL(files[0])
  }
}
function create() {
  const form = new FormData()
  form.append('title', organization.value.title)
  form.append('logo', organization.value.logo)
  form.append('config', organization.value.config)
  form.append('openai_org_key', organization.value.openai_org_key)
  form.append('openai_api_key', organization.value.openai_api_key)

  axios
    .post(`${apiUrl}/v1/admin/organization`, form)
    .then(() => {
      router.push('/organization')
    })
    .catch((err) => {
      alert(JSON.stringify(err.response.data.detail))
    })
}
</script>

<template>
  <div class="container">
    <div class="h5">Create Organization</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organization.title" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.title"><small>กรุณาระบุ title</small></span>
          </div>
        </div>
      </div>
      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">logo</div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-6">
              <img :src="organization.logo || defaultImage" class="img-fluid" alt="Preview Image" />
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
          <textarea
            class="form-control"
            v-model="organization.config"
            placeholder='JSON format like : {"theme": "dark"}`'
            rows="3"
          />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">openai_org_key</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organization.openai_org_key" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">openai_api_key</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="organization.openai_api_key" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end my-4">
      <button type="button" class="btn btn-success" @click="createOrganization">Create</button>
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
