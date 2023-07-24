<script setup>
defineProps({
  isTrue: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <font-awesome-icon
    v-if="isTrue"
    icon="fa-solid fa-circle-check "
    style="color: #3ec70b"
  />
  <font-awesome-icon v-else icon="fa-solid fa-circle-xmark " style="color: red" />
</template>
