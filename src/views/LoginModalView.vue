<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import dayjs from 'dayjs'

import axiosPublic from '@/api/axiosPublic'

const apiUrl = import.meta.env.VITE_API_URL
const router = useRouter()
const modalObject = ref()
const modalElement = ref()

const email = ref('')
const password = ref('')

const cookies = inject('$cookies')

const loginErrorMessage = ref('')

const isError = ref({
  email: false,
  password: false,
  login: false
})

const errorMessage = ref({
  email: ''
})

onMounted(() => {
  modalObject.value = new Modal(modalElement.value)
  modalObject.value.show()
})

function confirmLogin() {
  let isValid = true
  if (email.value === '' || email.value === null || email.value === undefined) {
    isError.value.email = true
    errorMessage.value.email = 'กรุณาระบุ email '
    isValid = false
  } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email.value)) {
    isError.value.email = true
    errorMessage.value.email = 'กรุณาระบุ email ให้ถูกต้อง'
    isValid = false
  } else {
    isError.value.email = false
  }
  if (password.value === '' || password.value === null || password.value === undefined) {
    isError.value.password = true
    isValid = false
  } else {
    isError.value.password = false
  }
  if (isValid) {
    login()
  }
}
function login() {
  let postData = { email: email.value, password: password.value }
  axiosPublic
    .post(`${apiUrl}/v1/auth/token`, JSON.stringify(postData))
    .then((res) => {
      cookies.set('accessToken', res.data.access_token, dayjs.unix(res.data.expires_at).toDate())
      cookies.set(
        'refreshToken',
        res.data.refresh_token,
        dayjs.unix(res.data.refresh_expires_at).toDate()
      )
      modalObject.value.hide()
      router.push('/user')
    })
    .catch((err) => {
      loginErrorMessage.value = err.response.data.detail
      isError.value.login = true
    })
}
</script>
<template>
  <div classs="container ">
    <div
      ref="modalElement"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-5">
          <div class="text-center">
            <h2 id="exampleModalLabel">Log In</h2>
          </div>

          <form @submit.prevent="confirmLogin" novalidate>
            <div class="my-2">
              <input
                type="email"
                class="form-control"
                style="height: 60px"
                placeholder="Email address"
                v-model="email"
              />
              <div class="mt-2">
                <span class="custom-color" v-if="isError.email"
                  ><small>{{ errorMessage.email }}</small></span
                >
              </div>
            </div>
            <div class="my-2">
              <input
                type="password"
                class="form-control"
                style="height: 60px"
                placeholder="password"
                v-model="password"
              />
              <div class="mt-2">
                <span class="custom-color" v-if="isError.password"
                  ><small>กรุณาระบุ password</small></span
                >
              </div>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <button type="submit" class="btn btn-primary">Log In</button>
            </div>

            <div class="d-flex justify-content-center mt-3">
              <span class="custom-color" v-if="isError.login"
                ><small>{{ loginErrorMessage }}</small></span
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-color {
  color: #ff0000;
}
</style>
