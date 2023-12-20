<template>
  <div>
    <button @click="logout" v-if="isLoggedIn === true">Logout</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  computed: mapState(["isLoggedIn"]),
  methods: {
    async logout() {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token);

      if (!token) {
        console.error("Token doesn't exist in localStorage");
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      try {
        const logout_response = await axios.post(
          "http://localhost:5000/api/auth/logout"
        );
        console.log("Logout response:", logout_response.status);
        if (logout_response.status === 200) {
          this.$store.commit("setLoggedIn", false);
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    async checkToken() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        this.$store.commit("setLoggedIn", false);
        return;
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        const token_response = await axios.post(
          "http://localhost:5000/api/auth/check-token-status"
        );
        this.$store.commit("setLoggedIn", token_response.status === 200);
        console.log("Token status:", token_response.status);
      } catch (error) {
        console.error("Błąd podczas sprawdzania tokena:", error);
        this.$store.commit("setLoggedIn", false);
        localStorage.removeItem("accessToken");
      }
    },
  },
  beforeMount() {
    this.checkToken();
    console.log("App beforeMount");
    const accessToken = localStorage.getItem("accessToken");
    console.log("Token:", accessToken);
  },
};
</script>
