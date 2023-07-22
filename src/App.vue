<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import { useDefaultStore } from './stores/default'

const defaultStore = useDefaultStore()
</script>

<template>
  <div class="app" :class="{ 'toggle-sidebar': defaultStore.isSidebarActive }">
    <NavBar />
    <SideBar />

    <main id="main" class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  scroll-behavior: smooth;
}

body {
  font-family: 'Open Sans', sans-serif;
  background: #f6f9ff;
  color: #444444;
}

a {
  color: #4154f1;
  text-decoration: none;
}

a:hover {
  color: #717ff5;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Nunito', sans-serif;
}

@media (min-width: 1200px) {
  #main,
  #footer {
    margin-left: 300px;
  }
}

@media (max-width: 1199px) {
  .toggle-sidebar .sidebar {
    left: 0;
  }
}

@media (min-width: 1200px) {
  .toggle-sidebar #main,
  .toggle-sidebar #footer {
    margin-left: 0;
  }

  .toggle-sidebar .sidebar {
    left: -300px;
  }
}

#main {
  margin-top: 60px;
  padding: 20px 30px;
  transition: all 0.3s;
}

@media (max-width: 1199px) {
  #main {
    padding: 1rem 0 0 0;
  }
}
</style>
