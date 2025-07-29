<template>
  <transition name="fade">
    <div v-if="props.visible" class="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

const props = defineProps<{
  message: string
  visible: boolean
}>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
