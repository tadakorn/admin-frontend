<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.vue'

const router = useRouter()
const systemPersonaId = router.currentRoute.value.params.id
const systemPersona = ref({})
const apiUrl = import.meta.env.VITE_API_URL
const deleteModal = ref()

onMounted(() => {
  getData()
})

function getData() {
  axios.get(`${apiUrl}/v1/admin/system_persona/${systemPersonaId}`).then((res) => {
    systemPersona.value = res.data
    systemPersona.value.preview_image = systemPersona.value.image_url
    systemPersona.value.created_at = dayjs
      .utc(systemPersona.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    systemPersona.value.updated_at = dayjs
      .utc(systemPersona.value.updated_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
  })
}

async function confirmDelete() {
  await axios.delete(`${apiUrl}/v1/admin/system_persona/${systemPersonaId}`)
  router.push('/system-persona')
}

function initModal(modal) {
  deleteModal.value = modal
}

function openDeleteModal() {
  deleteModal.value.show()
}

function onImageChange(e) {
  let files = e.target.files || e.dataTransfer.files
  if (files.length) {
    systemPersona.value.image_url = files[0]
    systemPersona.value.preview_image = URL.createObjectURL(files[0])
  }
}
</script>

<template>
  <div class="container">
    <div class="h5">Change System Persona</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ systemPersona.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
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
              <img :src="systemPersona.preview_image" class="img-fluid" alt="Responsive Image" />
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

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">{{ systemPersona.created_at }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">{{ systemPersona.updated_at }}</div>
      </div>
    </div>

    <div class="d-flex justify-content-between my-4">
      <button type="button" class="btn btn-danger" @click="openDeleteModal">Delete</button>
      <button type="button" class="btn btn-success">Save</button>
    </div>
  </div>

  <ConfirmDeleteModal @confirm-delete="confirmDelete" @init-modal="initModal" />
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
