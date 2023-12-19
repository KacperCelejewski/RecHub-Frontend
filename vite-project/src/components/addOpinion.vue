<template>
  <h1 class="h-fit text-center text-fourth text-xl">
    Create review for future employees
  </h1>
  <div class="flex justify-center w-full">
    <form @submit.prevent="addOpinion" class="w-3/4">
      <div class="flex flex-col p-4">
        <label for="title">Topic</label>
        <input type="text" id="title" v-model="opinion.title" />
        <label for="content">Content</label>
        <input type="text" id="content" v-model="opinion.content" />
        <label for="rating">Rating</label>
        <input
          placeholder="Rate this company! (1-5)"
          type="text"
          id="rating"
          v-model="opinion.rating"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      opinion: {
        title: "",
        content: "",
        rating: "",
        company_id: this.$route.params.id,
      },
    };
  },
  methods: {
    async addOpinion() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        const response = await axios.post(
          `http://localhost:5000/api/opinion/add`,
          this.opinion
        );
        console.log(response);
        console.log(this.$route.params.id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
