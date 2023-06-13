<script setup>
import { RouterView } from 'vue-router'

import NavbarShow from './components/NavbarShow.vue'
</script>

<template>
  <main>
    <NavbarShow />
    <RouterView class="main" />
  </main>
</template>

<style scoped>
.main {
  padding-left: 256px;
}
</style>
