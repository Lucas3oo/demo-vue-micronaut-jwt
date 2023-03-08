<script lang="ts">
import { defineComponent, inject } from "vue";
import type { BookDto } from "@/services/BookService";
import type { ResponseData } from "@/services/HttpClient";
import { bookService } from "@/services/ServiceNames";
import type { BookService } from "@/services/BookService";


export default defineComponent({
  name: "ItemComponent",
  data() {
    return {
      current: {} as BookDto,
      message: "",
    };
  },
  setup() {
    return {
      service: inject(bookService) as BookService,
    }
  },
  methods: {
    getItem(id: any) {
      this.service
        .getById(id)
        .then((response: ResponseData) => {
          this.current = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateItem() {
      this.service
        .update(this.current.id!, this.current)
        .then(() => {
          this.message = "The book was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteItem() {
      this.service
        .delete(this.current.id!)
        .then(() => {
          this.$router.push({ name: "books" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getItem(this.$route.params.id);
  },
});
</script>

<template>
  <div v-if="current.id" class="edit-form">
    <h4>Book</h4>
    <form>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="current.description"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteItem">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateItem">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a book...</p>
  </div>
</template>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
