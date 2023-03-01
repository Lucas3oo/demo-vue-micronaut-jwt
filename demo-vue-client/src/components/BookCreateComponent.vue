<script lang="ts">
import { defineComponent } from "vue";
import { default as service} from "@/services/BookService";
import type { BookDto } from "@/services/BookService";
import type { ResponseData } from "@/services/HttpClient";

export default defineComponent({
  name: "create-item",
  data() {
    return {
      item: {
        id: "",
        description: "",
      } as BookDto,
      submitted: false,
    };
  },
  methods: {
    save() {
      let data = {
        id: "",
        description: this.item.description,
      } as BookDto;

      service.create(data)
        .then((response: ResponseData) => {
          this.item.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    new() {
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

      <button @click="save" class="btn btn-success">Save</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="new">New Book...</button>
    </div>
  </div>
</template>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>