<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Form from './components/Form.vue'
</script>

<template>
  <Navbar />

  <div class="box-viewer">
    <Form />
  </div>
</template>

<style>

.box-viewer {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* border: black solid 1px; */
  margin: 1rem;
  padding: 1rem;
}

</style>