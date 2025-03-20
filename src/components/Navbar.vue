<template>
    <nav class="navbar">
      <div class="logo">
        <img src="/v3.svg" alt="Vite logo" />
      </div>
      <section class="title">
          Vetor3 Lab Create
      </section>
    </nav>
</template>

<script setup lang="ts">
</script>

<style>
.navbar {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
  flex-direction: row;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  justify-content: center;
}
</style>