<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = router.currentRoute.value.params.id
const user = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/user/${userId}`).then((res) => {
    user.value = res.data
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <div class="h5 pt-4">User ID {{ user.id }}</div>
    <table class="table">
      <tbody>
        <tr>
          <td scope="col">id</td>
          <td>{{ user.id }}</td>
        </tr>
        <tr>
          <td scope="col">email</td>
          <div>
            <input type="email" class="form-control" v-model="user.email" />
          </div>
        </tr>
        <tr>
          <td scope="col">role</td>
          <td>{{ user.role }}</td>
        </tr>
        <tr>
          <td scope="col">organization</td>
          <td>{{ user.organization }}</td>
        </tr>
        <tr>
          <td scope="col">is_active</td>
          <td>
            <input class="form-check-input" type="checkbox" v-model="user.is_active" />
          </td>
        </tr>
        <tr>
          <td scope="col">is_verified</td>
          <td>
            <input class="form-check-input" type="checkbox" v-model="user.is_verified" />
          </td>
        </tr>
        <tr>
          <td scope="col">verified_date</td>
          <td>{{ user.verified_date }}</td>
        </tr>
        <tr>
          <td scope="col">creator</td>
          <td>{{ user.creator }}</td>
        </tr>
        <tr>
          <td scope="col">last_login</td>
          <td>{{ user.last_login }}</td>
        </tr>
        <tr>
          <td scope="col">last_access</td>
          <td>{{ user.ast_access }}</td>
        </tr>
        <tr>
          <td scope="col">created_at</td>
          <td>{{ user.created_at }}</td>
        </tr>
        <tr>
          <td scope="col">updated_at</td>
          <td>{{ user.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td {
  border: none;
}
</style>
