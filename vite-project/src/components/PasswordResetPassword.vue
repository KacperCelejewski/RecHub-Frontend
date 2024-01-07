<template>
  <div>
    <h1>Reset Password</h1>
    <form @submit.prevent="resetPassword" class="flex justify-center flex-col">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" />

      <button type="submit">Reset Password</button>
    </form>
    <div>
      <button @click="goToLoginView">Back to Login</button>
    </div>
    <div>{{ message }}</div>
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
        password: "",
      },
      message: "",
      token: "",
    };
  },
  methods: {
    async resetPassword() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/reset-password/${this.$route.params.token}`,
          {
            password: this.user.password,
          }
        );
        console.log(response);
        this.message = response.data.message;
        console.log(response.data.message);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
