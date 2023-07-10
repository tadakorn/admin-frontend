<script setup>
import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const cookies = inject('$cookies')
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL

const title = ref('')
const detail = ref('')
const prompts = ref('')

const isError = ref({
  title: false,
  detail: false,
  prompt: false
})

function createPrompt() {
  let isValid = true
  if (title.value === '' || title.value === null || title.value === undefined) {
    isError.value.title = true
    isValid = false
  } else {
    isError.value.title = false
  }

  if (prompts.value === '' || prompts.value === null || prompts.value === undefined) {
    isError.value.prompt = true
    isValid = false
  } else {
    isError.value.prompt = false
  }
  if (isValid) {
    create()
  }
}

function create() {
  let postData = { title: title.value, detail: detail.value, prompt: prompts.value }
  const accessToken = cookies.get('accessToken')
  const config = { headers: { Authorization: `Bearer ${accessToken}` } }
  axios.post(`${apiUrl}/v1/admin/prompt`, postData, config).then((res) => {
    res.data
    router.push('/prompt')
  })
}
</script>

<template>
  <div class="container">
    <div class="h5">Create Prompt</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="title" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.title"><small>กรุณาระบุ title</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">detail</div>
        <div class="col-12 col-md-6 form-group">
          <textarea rows="3" class="form-control" v-model="detail"></textarea>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">prompt</div>
        <div class="col-12 col-md-6 form-group">
          <textarea rows="3" class="form-control" v-model="prompts"></textarea>
          <div class="mt-2">
            <span class="custom-color" v-if="isError.prompt"><small>กรุณาระบุ prompt</small></span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end my-4">
      <button type="button" class="btn btn-success" @click="createPrompt">Create</button>
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
