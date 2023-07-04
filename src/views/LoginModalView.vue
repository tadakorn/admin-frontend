<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import axios from 'axios'
import dayjs from 'dayjs'

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

onMounted(() => {
  modalObject.value = new Modal(modalElement.value)
  modalObject.value.show()
})

function confirmLogin() {
  let isValid = true
  if (email.value === '' || email.value === null || email.value === undefined) {
    isError.value.email = true
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
  let customConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  axios
    .post(`${apiUrl}/v1/auth/token`, JSON.stringify(postData), customConfig)
    .then((res) => {
      console.log(res.data)
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
      loginErrorMessage.value = err.message
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
            <h2 id="exampleModalLabel">log In</h2>
          </div>
          <div class="my-2">
            <input
              type="email"
              class="form-control"
              style="height: 60px"
              placeholder="Email address"
              v-model="email"
            />
            <div class="mt-2">
              <span class="custom-color" v-if="isError.email"><small>กรุณาระบุ อีเมล</small></span>
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
              <span class="custom-color" v-if="isError.email"
                ><small>กรุณาระบุ รหัสผ่าน</small></span
              >
            </div>
          </div>
          <div class="d-flex justify-content-center mt-2">
            <button type="button" class="btn btn-primary" @click="confirmLogin">log in</button>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <span class="custom-color" v-if="isError.login"
              ><small>{{ loginErrorMessage }}</small></span
            >
          </div>
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
