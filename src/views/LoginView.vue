<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const modalObject = ref()
const modalElement = ref()

const email = ref('')
const password = ref('')
const rememberPassword = ref('')

const isError = ref({
  email: false,
  password: false,
  rememberPassword: false
})

onMounted(() => {
  modalObject.value = new Modal(modalElement.value)
  modalObject.value.show()
})

function confirmLogin() {
  if (email.value === '' || email.value === null || email.value === undefined) {
    isError.value.email = true
  } else {
    isError.value.email = false
  }
  if (password.value === '' || password.value === null || password.value === undefined) {
    isError.value.password = true
  } else {
    isError.value.password = false
  }
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
      <div class="modal-dialog">
        <div class="modal-content p-5">
          <div class="text-center">
            <h2 id="exampleModalLabel">log In</h2>
          </div>
          <div class="my-3">
            <input
              type="email"
              class="form-control"
              style="height: 60px"
              placeholder="Email address"
              v-modal="email"
            />
            <div class="mt-2">
              <span class="custom-color" v-if="isError.email"><small>กรุณาระบุ อีเมล</small></span>
            </div>
          </div>
          <div class="my-3">
            <input
              type="password"
              class="form-control"
              style="height: 60px"
              placeholder="password"
              v-modal="password"
            />
            <div class="mt-2">
              <span class="custom-color" v-if="isError.email"
                ><small>กรุณาระบุ รหัสผ่าน</small></span
              >
            </div>
          </div>
          <div class="my-3">
            <input class="form-check-input" type="checkbox" v-model="rememberPassword" /><span>
              Remember Password</span
            >
          </div>
          <div class="d-flex justify-content-center my-3">
            <button type="button" class="btn btn-primary" @click="confirmLogin">log in</button>
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
