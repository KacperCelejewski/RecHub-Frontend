<template>
  <Logout />
  <div class="flex flex-col items-center justify-center">
    <div
      v-if="invvalidData === true"
      class="text-rose-600 border-solid border-2 border-rose-600 p-1 rounded"
    >
      <svg
        class="cursor-pointer"
        @click="invvalidData = !invvalidData"
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        viewBox="0 0 512 512"
      >
        <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
        <path
          d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"
        />
      </svg>
      <p>Invalid E-mail or Password, try again!</p>
    </div>
    <p v-if="message === 'User logged in!'">
      Welcome back, champion! Your achievements await
    </p>
    <h1 class="text-2xl text-fourth font-roboto-1 p-2 text-center">
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
    <div>
      <button @click="goToPasswordResetView">Forgot Password?</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PasswordReset from "../components/PasswordResetEmail.vue";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      message: "",
      invvalidData: false,
    };
  },
  methods: {
    async goToPasswordResetView() {
      this.$router.push("/reset-password");
    },
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
        if (response.data.message === "User logged in!") {
          this.$router.push("/");
        } else {
          this.invvalidData = true;
        }
        localStorage.setItem("accessToken", response.data.access_token);
        this.$store.commit("setLoggedIn", true);
      } catch (err) {
        console.error(err);
        this.invvalidData = true;
      }
    },
  },
  components: { PasswordReset },
};
</script>
