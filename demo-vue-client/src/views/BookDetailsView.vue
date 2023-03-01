<script setup lang="ts">
import BookDetailsComponent from "../components/BookDetailsComponent.vue";
</script>


<template>
  <BookDetailsComponent/>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
