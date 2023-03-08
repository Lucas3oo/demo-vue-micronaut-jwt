<script lang="ts">
import { defineComponent, inject } from "vue";
import type { BookDto } from "@/services/BookService";
import type { ResponseData } from "@/services/HttpClient";
import { bookService } from "@/services/ServiceNames";
import type { BookService } from "@/services/BookService";


export default defineComponent({
  name: "CreateComponent",
  data() {
    return {
      item: {
        description: "",
      } as BookDto,
      submitted: false,
    };
  },
  setup() {
    return {
      service: inject(bookService) as BookService,
    }
  },
  methods: {
    saveItem() {
      let data = {
        description: this.item.description,
      } as BookDto;

      this.service
        .create(data)
        .then((response: ResponseData) => {
          this.item.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newItem() {
      this.submitted = false;
      this.item = {} as BookDto;
    },
  },
});
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          required
          v-model="item.description"
          name="description"
        />
      </div>

      <button @click="saveItem" class="btn btn-success">Save</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newItem">New Book...</button>
    </div>
  </div>
</template>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
