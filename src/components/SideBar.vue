<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useDefaultStore } from '../stores/default'

const router = useRouter()
const defaultStore = useDefaultStore()

function isRouteActive(path) {
  return router.currentRoute.value.path !== path
}

function changePage() {
  if (window.innerWidth <= 1199) {
    defaultStore.toggleSidebar()
  }
}
</script>

<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/user') }"
          to="/user"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-user" />
          <span>User</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/organization') }"
          to="/organization"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-building" />
          <span>Organization</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/prompt') }"
          to="/prompt"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-comments" />

          <span>Prompt</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/chat') }"
          to="/chat"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-comment" />
          <span>Chat</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/chat-folder') }"
          to="/chat-folder"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-folder-closed" />
          <span>Chat Folder</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ collapsed: isRouteActive('/chat-messages') }"
          to="/chat-messages"
          @click="changePage"
        >
          <font-awesome-icon icon="fa-regular fa-comment-dots" />
          <span>Chat Message</span>
        </RouterLink>
      </li>
    </ul>
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
