import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('default', () => {
  const isSidebarActive = ref(false)
  
  function toggleSidebar() {
    isSidebarActive.value = !isSidebarActive.value
  }

  return { isSidebarActive, toggleSidebar }
})
