<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { Modal } from 'bootstrap';

const modalObject = ref()
const modalElement = ref()
const emit = defineEmits([
    'init-modal',
    'confirm-delete',
])

onMounted(() => {
    modalObject.value = new Modal(modalElement.value)
    emit('init-modal', modalObject.value)
})

function confirmDelete() {
    modalObject.value.hide()
    emit('confirm-delete')
}
</script>

<template>
<div 
    ref="modalElement"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
         <div class="d-flex flex-column">
            <div class="h1 align-self-center p-4">Confirm Delete ?</div>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
            </div>
         </div>
      </div>
    </div>
  </div>
</div>
</template>