<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const prompt = ref({
  title: null,
  detail: null,
  prompt: null
})

function create() {
  router.push('/prompt')
}
</script>

<template>
  <div class="container">
    <div class="h5 pt-4">Create Prompt</div>

    <table class="table">
      <tbody>
        <tr>
          <td scope="col">title</td>
          <td>
            <input type="text" class="form-control" v-model="prompt.title" />
          </td>
        </tr>
        <tr>
          <td scope="col">detail</td>
          <td>
            <input type="text" class="form-control" v-model="prompt.detail" />
          </td>
        </tr>
        <tr>
          <td scope="col">prompt</td>
          <td>
            <input type="text" class="form-control" v-model="prompt.prompt" />
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
