<template>
  <form @submit.prevent="addUser">
    <label for="email">email</label>
    <input type="text" id="email" v-model="user.email" />
    <label for="password">password</label>
    <input type="text" id="password" v-model="user.password" />
    <button type="submit">Add</button>
  </form>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async addUser() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/login`,
          {
            email: this.user.email,
            password: this.user.password,
          }
        );
        console.log(response);
        localStorage.setItem("accessToken", response.data.access_token);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
