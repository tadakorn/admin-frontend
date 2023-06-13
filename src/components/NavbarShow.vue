<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = router.currentRoute

function isRouteActive(path) {
  return currentRoute.value.path === path
}
</script>

<template>
  <div class="main-container d-flex">
    <div class="sidebar" id="side_nav">
      <div class="header-box px-2 pt-3 pb-4">
        <div class="pt-2 pb-4">
          <span class="text-white title">PromptMark Administration</span>
        </div>
        <!-- <button type="button" class="btn d-md-none d-block class-btn px-1 py-0 text-white">
          <font-awesome-icon icon="fa-solid fa-bars-staggered" />
        </button> -->
        <ul class="list-unstyled px-2">
          <li :class="{ active: isRouteActive('/user') }">
            <RouterLink to="/user" class="text-decoration-none px-2 py-2 d-block">
              <font-awesome-icon icon="fa-regular fa-user" class="pe-2" />User
            </RouterLink>
          </li>
          <li :class="{ active: isRouteActive('/organization') }">
            <RouterLink to="/organization" class="text-decoration-none px-2 py-2 d-block"
              ><font-awesome-icon icon="fa-regular fa-heart" class="pe-2" />Organization
            </RouterLink>
          </li>
          <li :class="{ active: isRouteActive('/prompt') }">
            <RouterLink to="/prompt" class="text-decoration-none px-2 py-2 d-block"
              ><font-awesome-icon icon="fa-solid fa-terminal" class="pe-2" />Prompt
            </RouterLink>
          </li>
          <li :class="{ active: isRouteActive('/chat') }">
            <RouterLink to="/chat" class="text-decoration-none px-2 py-2 d-block"
              ><font-awesome-icon icon="fa-regular fa-comments" class="pe-2" />Chat
            </RouterLink>
          </li>
          <li :class="{ active: isRouteActive('/chat-folder') }">
            <RouterLink to="/chat-folder" class="text-decoration-none px-2 py-2 d-block"
              ><font-awesome-icon icon="fa-regular fa-folder-closed" class="pe-2" />Chat Folder
            </RouterLink>
          </li>
          <li :class="{ active: isRouteActive('/chat-message') }">
            <RouterLink to="/chat-message" class="text-decoration-none px-2 py-2 d-block"
              ><font-awesome-icon icon="fa-regular fa-message" class="pe-2" />Chat Messages
            </RouterLink>
          </li>
        </ul>
        <hr class="h-color mx-2" />
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 256px;
  position: absolute;
}
#side_nav {
  background: #000;
  min-width: 250px;
  max-width: 250px;
}
.content {
  min-height: 100vh;
  width: 100%;
}
hr.h-color {
  color: #eee;
}
.title {
  font-size: 18px;
  padding-left: 0.5rem;
}
.sidebar li.active {
  background: #eee;
  border-radius: 8px;
}

.sidebar li.active a,
.sidebar li.active a:hover {
  color: #000;
}

.sidebar li a {
  color: #fff;
}
</style>
