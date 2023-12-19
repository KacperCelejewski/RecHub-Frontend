<template>
  <div class="flex flex-col items-center justify-center">
    <p v-if="message === 'User logged in!'">
      Welcome back, champion! Your achievements await
    </p>
    <h1 class="text-2xl text-fourth font-roboto-1">
      Step into Success: Your Journey Begins with a Simple Login
    </h1>
    <form
      @submit.prevent="addUser"
      class="flex flex-col items-center justify-center border-2 border-fourth rounded p-4 mt-4"
    >
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="user.email" />
      <label for="password">Password</label>
      <input type="text" id="password" v-model="user.password" />
      <button
        class="p-2 font-roboto-2 mt-3 rounded bg-fourth text-secondary"
        type="submit"
      >
        Start Exploring
      </button>
    </form>
  </div>
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
      message: "",
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
        this.message = response.data.message;
        console.log(response.data.message);
        localStorage.setItem("accessToken", response.data.access_token);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
