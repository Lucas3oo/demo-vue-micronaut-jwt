<script setup lang="ts">
import BookListComponent from "../components/BookListComponent.vue";
</script>


<template>
  <BookListComponent/>
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
