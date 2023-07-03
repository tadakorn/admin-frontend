<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const organization = ref({
  id: null,
  title: null,
  openai_org_key: null,
  openai_api_key: null
})

function create() {
  router.push('/organization')
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
