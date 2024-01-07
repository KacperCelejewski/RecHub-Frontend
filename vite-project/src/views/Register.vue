<template>
  <Logout />
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl text-fourth font-roboto-1">
      Together, we're making history – register and be part of it
    </h1>
    <form
      @submit.prevent="register"
      class="flex flex-col items-center justify-center p-2 border-2 border-solid border-third mt-4 rounded"
    >
      <label for="username">Name</label>
      <input type="text" id="username" v-model="user.name" />
      <label for="email">Email</label>
      <input type="text" id="email" v-model="user.email" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" />
      <label for="surrname">Surname</label>
      <input type="text" id="surrname" v-model="user.surname" />
      <button
        class="p-2 font-roboto-2 mt-3 rounded bg-fourth text-secondary"
        type="submit"
      >
        Create Account
      </button>
      <router-link to="/login">
        <p class="text-fourth mt-2">
          Already have an account? Log in!
        </p></router-link
      >
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/register`,
          {
            name: this.user.name,
            surrname: this.user.surname,
            email: this.user.email,
            password: this.user.password,
          }
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
