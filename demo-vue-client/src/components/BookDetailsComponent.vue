<script lang="ts">
import { defineComponent } from "vue";
import { default as service} from "@/services/BookService";
import type { BookDto } from "@/services/BookService";
import type { ResponseData } from "@/services/HttpClient";

export default defineComponent({
  name: "item",
  data() {
    return {
      current: {} as BookDto,
      message: "",
    };
  },
  methods: {
    get(id: any) {
      service.getById(id)
        .then((response: ResponseData) => {
          this.current = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    update() {
      service.update(this.current.id, this.current)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The book was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    delete() {
      service.delete(this.current.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "books" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.get(this.$route.params.id);
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


    <button class="badge badge-danger mr-2" @click="delete">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="update">
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