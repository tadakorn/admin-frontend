<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({
  email: null,
  password: null,
  role: null,
  organization: null,
  isActive: true,
  isVerified: null,
  verrifiedDate: null
})

const isError = ref({
  email: false,
  password: false,
  role: false,
  organization: false
})

function create() {
  let isValid = true
  if (user.value.email === '' || user.value.email === null || user.value.email === undefined) {
    isError.value.email = true
    isValid = false
  } else {
    isError.value.email = false
  }

  if (
    user.value.password === '' ||
    user.value.password === null ||
    user.value.password === undefined
  ) {
    isError.value.password = true
    isValid = false
  } else {
    isError.value.password = false
  }

  if (user.value.role === '' || user.value.role === null || user.value.role === undefined) {
    isError.value.role = true
    isValid = false
  } else {
    isError.value.role = false
  }

  if (
    user.value.organization === '' ||
    user.value.organization === null ||
    user.value.organization === undefined
  ) {
    isError.value.organization = true
    isValid = false
  } else {
    isError.value.organization = false
  }

  if (isValid) {
    router.push('/user')
  }
}
</script>
<template>
  <div class="container">
    <div class="h5">Create User</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">email</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="user.email" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.email"><small>กรุณาระบุ email</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">password</div>
        <div class="col-12 col-md-6">
          <input type="password" class="form-control" v-model="user.password" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.password"
              ><small>กรุณาระบุ password</small></span
            >
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">role</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="user.role" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.role"><small>กรุณาระบุ role</small></span>
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">organization</div>
        <div class="col-12 col-md-6">
          <input type="text" class="form-control" v-model="user.organization" />
          <div class="mt-2">
            <span class="custom-color" v-if="isError.organization"
              ><small>กรุณาระบุ organization</small></span
            >
          </div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">isActive</div>
        <div class="col-12 col-md-6">
          <input type="checkbox" class="form-check-input" v-model="user.isActive" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">isVerified</div>
        <div class="col-12 col-md-6">
          <input type="checkbox" class="form-check-input" v-model="user.isVerified" />
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
.custom-color {
  color: #ff0000;
}
</style>
