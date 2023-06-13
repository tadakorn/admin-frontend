<script setup>
import { RouterLink } from 'vue-router'
import { useDefaultStore } from '../stores/default'

const defaultStore = useDefaultStore()
const projectName = import.meta.env.VITE_PROJECT_NAME
</script>

<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <RouterLink to="/" class="logo d-flex align-items-center">
        <img src="@/assets/logo.png" alt="" />
        <span class="d-none d-lg-block">{{ projectName }}</span>
      </RouterLink>
      <font-awesome-icon
        icon="fa-solid fa-bars"
        class="toggle-sidebar-btn"
        @click="defaultStore.toggleSidebar()"
      />
    </div>
  </header>
</template>

<style scoped>
.logo {
  line-height: 1;
}

.logo img {
  max-height: 26px;
  margin-right: 6px;
}

@media (min-width: 1200px) {
  .logo {
    width: 300px;
  }
}

.logo span {
  font-size: 26px;
  font-weight: 700;
  color: #012970;
  font-family: 'Nunito', sans-serif;
}

.header {
  transition: all 0.5s;
  z-index: 997;
  height: 60px;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
  padding-left: 20px;
}

.header .toggle-sidebar-btn {
  font-size: 26px;
  cursor: pointer;
  padding-left: 10px;
  color: #012970;
}
</style>
