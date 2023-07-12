<script setup>
import { inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useDefaultStore } from '../stores/default'

const router = useRouter()
const defaultStore = useDefaultStore()
const cookies = inject('$cookies')
const navItems = ref([
  {
    path: "/user",
    title: "User",
    icon: "fa-regular fa-user"
  },
  {
    path: "/organization",
    title: "Organization",
    icon: "fa-regular fa-building"
  },
  {
    path: "/api-key",
    title: "API Key",
    icon: "fa-solid fa-key"
  },
  {
    path: "/prompt",
    title: "Prompt",
    icon: "fa-regular fa-comments"
  },
  {
    path: "/chat",
    title: "Chat",
    icon: "fa-regular fa-comment"
  },
  {
    path: "/chat-folder",
    title: "Chat Folder",
    icon: "fa-regular fa-folder-closed"
  },
  {
    path: "/system-persona",
    title: "System Persona",
    icon: "fa-solid fa-person-shelter"
  },
])

function isRouteActive(path) {
  return router.currentRoute.value.path !== path
}

function changePage() {
  if (window.innerWidth <= 1199) {
    defaultStore.toggleSidebar()
  }
}

function logout() {
  cookies.remove('accessToken')
  cookies.remove('refreshToken')
  router.push('/login')
}
</script>

<template>
  <aside id="sidebar" class="sidebar d-flex justify-content-between flex-column">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li v-for="item in navItems" :key="item.path" class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive(`${item.path}`) }"
          :to="item.path"
          @click="changePage"
        >
          <font-awesome-icon :icon="item.icon" />
          <span>{{ item.title }}</span>
        </RouterLink>
      </li>
    </ul>
    <div>
      <button type="button" class="btn btn-danger">
        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="me-2" />
        <span @click="logout">Log Out</span>
      </button>
    </div>
  </aside>
</template>

<style>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 996;
  transition: all 0.3s;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
}

@media (max-width: 1199px) {
  .sidebar {
    left: -300px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-item {
  margin-bottom: 5px;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #4154f1;
  transition: 0.3;
  background: #f6f9ff;
  padding: 10px 15px;
  border-radius: 4px;
}

.sidebar-nav .nav-link svg {
  width: 16px;
  margin-right: 10px;
  color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
  color: #012970;
  background: #fff;
}

.sidebar-nav .nav-link.collapsed svg {
  color: #899bbd;
}

.sidebar-nav .nav-link:hover {
  color: #4154f1;
  background: #f6f9ff;
}

.sidebar-nav .nav-link:hover svg {
  color: #4154f1;
}
</style>
