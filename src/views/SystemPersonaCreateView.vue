<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL
const systemPersona = ref({
  name: null,
  image: null,
  prompt: null
})

function onImageChange(e) {
  let files = e.target.files || e.dataTransfer.files
  if (!files.length) {
    systemPersona.value.image = null
  } else {
    systemPersona.value.image = files[0]
  }
}

function create() {
  const form = new FormData()
  form.append('name', systemPersona.value.name)
  form.append('image', systemPersona.value.image)
  form.append('prompt', systemPersona.value.prompt)

  axios.post(`${apiUrl}/v1/admin/system_persona`, form)

  router.push('/system-persona')
}
</script>

<template>
  <div class="container">
    <div class="h5 pt-4">Create System Persona</div>

    <table class="table">
      <tbody>
        <tr>
          <td scope="col">name</td>
          <td>
            <input type="text" class="form-control" v-model="systemPersona.name" />
          </td>
        </tr>
        <tr>
          <td scope="col">image</td>
          <td>
            <input class="form-control" type="file" v-on:change="onImageChange" />
          </td>
        </tr>
        <tr>
          <td scope="col">prompt</td>
          <td>
            <input type="text" class="form-control" v-model="systemPersona.prompt" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-success btn-sm" @click="create">Create</button>
    </div>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
