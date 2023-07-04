<script setup>
import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import defaultImage from '../assets/default.jpg'

const cookies = inject('$cookies')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const systemPersona = ref({
  name: null,
  preview_image: null,
  image: null,
  prompt: null
})

function onImageChange(e) {
  let files = e.target.files || e.dataTransfer.files
  if (!files.length) {
    systemPersona.value.image = null
    systemPersona.value.preview_image = null
  } else {
    systemPersona.value.image = files[0]
    systemPersona.value.preview_image = URL.createObjectURL(files[0])
  }
}

async function create() {
  const form = new FormData()
  form.append('name', systemPersona.value.name)
  form.append('image', systemPersona.value.image)
  form.append('prompt', systemPersona.value.prompt)

  const accessToken = cookies.get('accessToken')
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' }
  }
  await axios.post(`${apiUrl}/v1/admin/system_persona`, form, config)

  router.push('/system-persona')
}
</script>

<template>
  <div class="container">
    <div class="h5">Create System Persona</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">name</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="systemPersona.name" />
        </div>
      </div>
      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">image</div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-6">
              <img
                :src="systemPersona.preview_image || defaultImage"
                class="img-fluid"
                alt="Preview Image"
              />
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
        <div class="col-12 col-md-2 title">prompt</div>
        <div class="col-12 col-md-6">
          <textarea class="form-control" v-model="systemPersona.prompt" rows="3"></textarea>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end my-4">
      <button type="button" class="btn btn-success" @click="create">Create</button>
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
