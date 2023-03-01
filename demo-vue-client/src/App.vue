<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Books</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/books" class="nav-link">List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">New Book...</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
