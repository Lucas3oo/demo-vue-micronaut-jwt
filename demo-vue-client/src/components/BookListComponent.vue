<script lang="ts">
import { defineComponent } from "vue";
import { default as service } from "@/services/BookService";
import type { BookDto } from "@/services/BookService";
import type { ResponseData } from "@/services/HttpClient";

export default defineComponent({
  name: "ListComponent",
  data() {
    return {
      list: [] as BookDto[],
      current: {} as BookDto,
      currentIndex: -1,
      description: "",
    };
  },
  methods: {
    getAll() {
      service
        .getAll()
        .then((response: ResponseData) => {
          this.list = response.data;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.getAll();
      this.current = {} as BookDto;
      this.currentIndex = -1;
    },

    setActive(item: BookDto, index = -1) {
      this.current = item;
      this.currentIndex = index;
    },

    searchDescription() {
      service
        .getByQueryParams(this.description)
        .then((response: ResponseData) => {
          this.list = response.data;
          this.setActive({} as BookDto);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getAll();
  },
});
</script>

<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by description"
          v-model="description"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchDescription"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Book List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(item, index) in list"
          :key="index"
          @click="setActive(item, index)"
        >
          {{ item.description }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="current.id">
        <h4>Book</h4>
        <div>
          <label><strong>Description:</strong></label> {{ current.description }}
        </div>
        <router-link :to="'/books/' + current.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Book...</p>
      </div>
    </div>
  </div>
</template>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
