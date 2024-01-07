<template>
  <div>
    <div>{{ message }}</div>
    <h1 class="text-fourth">Reset Password</h1>
    <form @submit.prevent="resetPassword" class="flex justify-center flex-col">
      <label for="email">Email</label>
      <input
        class="border-solid border-b-2 border-black"
        type="email"
        id="email"
        v-model="user.email"
      />
      <button type="submit">Reset Password</button>
    </form>
    <div>
      <button @click="goToLoginView">Back to Login</button>
    </div>
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
      },
      message: "",
      token: "",
    };
  },
  methods: {
    async goToLoginView() {
      this.$router.push("/login");
    },
    async resetPassword() {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/reset-password`,
          {
            email: this.user.email,
          }
        );
        console.log(response);
        this.message = "Check your email for password reset link";
        console.log(response.data.message);
      } catch (error) {
        this.message = "User with this email does not exist";
      }
    },
  },
};
</script>
