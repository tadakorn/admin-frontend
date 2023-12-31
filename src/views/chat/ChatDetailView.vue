<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import chatMessage from '../../components/ChatMessage.vue'

import dayjs from 'dayjs'

const router = useRouter()
const chatId = router.currentRoute.value.params.id
const chatDetail = ref({})
const apiUrl = import.meta.env.VITE_API_URL

function getData() {
  axios.get(`${apiUrl}/v1/admin/chat/chat/${chatId}`).then((res) => {
    chatDetail.value = res.data
    chatDetail.value.created_at = dayjs
      .utc(chatDetail.value.created_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
    chatDetail.value.updated_at = dayjs
      .utc(chatDetail.value.updated_at)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD HH:mm:ss')
  })
}

onMounted(() => {
  getData()
})
</script>
<template>
  <div class="container">
    <div class="h5">Change Chat</div>

    <div class="bg-white p-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-12 col-md-2 title">id</div>
        <div class="col-12 col-md-6">{{ chatDetail.id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">uid</div>
        <div class="col-12 col-md-6">{{ chatDetail.uid }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">title</div>
        <div class="col-12 col-md-6">{{ chatDetail.title }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">user_id</div>
        <div class="col-12 col-md-6">{{ chatDetail.user_id }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">seq</div>
        <div class="col-12 col-md-6">{{ chatDetail.seq }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">message_count</div>
        <div class="col-12 col-md-6">{{ chatDetail.message_count }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">is_active</div>
        <div class="col-12 col-md-6">
          <font-awesome-icon
            v-if="chatDetail.is_active"
            icon="fa-solid fa-circle-check "
            style="color: #3ec70b"
          />
          <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">is_published</div>
        <div class="col-12 col-md-6">
          <font-awesome-icon
            v-if="chatDetail.is_published"
            icon="fa-solid fa-circle-check "
            style="color: #3ec70b"
          />
          <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">publish_date</div>
        <div class="col-12 col-md-6">
          <div>{{ chatDetail.publish_date }}</div>
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">folder_id</div>
        <div class="col-12 col-md-6">
          {{ chatDetail.folder_id }}
        </div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">created_at</div>
        <div class="col-12 col-md-6">{{ chatDetail.created_at }}</div>
      </div>

      <div class="row align-items-center mt-4">
        <div class="col-12 col-md-2 title">updated_at</div>
        <div class="col-12 col-md-6">{{ chatDetail.updated_at }}</div>
      </div>
    </div>
  </div>
  <chatMessage :chatId="chatId" />
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
    margin-bottom: 5px;
  }
}
</style>
