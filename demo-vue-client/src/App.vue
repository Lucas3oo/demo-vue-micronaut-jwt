<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data: function () {
    return { authenticated: false };
  },
  async created() {
    await this.isAuthenticated();
    this.$auth.authStateManager.subscribe(this.isAuthenticated);
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated",
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    async logout() {
      await this.$auth.signOut();
    },
  },
});
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Books</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/books" v-if="authenticated" class="nav-link">List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" v-if="authenticated" class="nav-link">New Book...</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" v-if="!authenticated" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item">
          <a v-if="authenticated" v-on:click="logout()" class="nav-link">Logout</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
