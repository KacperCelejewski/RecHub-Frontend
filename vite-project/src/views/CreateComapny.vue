<template>
  <Logout />
  <div class="flex flex-col items-center justify-center">
    <h1>Let's start with a few infos about your company</h1>
    <div
      v-if="isError"
      class="mt-3 p-1 border-2 border-solid border-rose-600 bg-gray-100 rounded"
    >
      <svg
        class="cursor-pointer"
        @click="isError = !isError"
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

      <p class="text-rose-600">Company already exists!</p>
    </div>
    <div
      v-if="result"
      class="mt-3 p-1 border-2 border-solid border-green-600 bg-gray-100 rounded"
    >
      <svg
        class="cursor-pointer"
        @click="result = !result"
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
      <p>Copany created successfully!</p>
    </div>
    <form
      @submit.prevent="createCompany"
      class="w-3/4 flex flex-col items-center justify-center"
    >
      <label for="companyName">Company name</label>
      <input
        type="text"
        v-model="company.name"
        id="companyName"
        class="text-sm p-1 w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
        placeholder="Please provide your company name"
      />

      <label for="companyDescription">Company description</label>
      <input
        type="text"
        v-model="company.description"
        id="companyDescription"
        placeholder="e.g., Innovative Solutions Provider"
        class="text-sm p-1 w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
      />

      <label for="companyWebsite">Company website</label>
      <input
        type="text"
        v-model="company.website"
        id="companyWebsite"
        placeholder="Begin with http, https or www: e.g., https://yourwebsite.com"
        class="p-1 text-sm w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
      />

      <label for="companyIndustry">Company industry</label>
      <input
        type="text"
        id="companyIndustry"
        placeholder="Company industry"
        v-model="company.industry"
        class="w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
      />

      <label for="companyTechnology">Company technology</label>
      <input
        type="text"
        v-model="company.technology"
        id="companyTechnology"
        placeholder="Company technology"
        class="w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
      />

      <label for="companyCEO">Company CEO</label>
      <input
        type="text"
        v-model="company.ceo"
        id="companyCEO"
        placeholder="Company CEO"
        class="w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
      />
      <div class="flex flex-col justify-center">
        <select
          class="mb-2 mt-2"
          v-model="selectedCountry"
          @change="fetchCities"
        >
          <option value="" disabled selected>Select your country</option>
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country"
          >
            {{ country }}
          </option>
        </select>
        <select v-model="selectedCity" :disabled="!selectedCountry">
          <option value="" disabled selected>Select your city</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
      <label
        for="companyLogo"
        class="mt-3 p-1 rounded cursor-pointer bg-fourth text-secondary"
        >Upload your logo
        <input
          type="file"
          @change="handleLogoUpload($event)"
          id="companyLogo"
          placeholder="Company logo"
          class="hidden"
      /></label>

      <button type="submit">Create Company Profile</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      company: {
        name: "",
        description: "",
        industry: "",
        technology: "",
        ceo: "",
      },
      logo: null,
      countries: [],
      selectedCountry: "",
      cities: [],
      selectedCity: "",
      isError: false,
      result: false,
    };
  },

  methods: {
    onSubmit(e) {
      const file = this.$refs.file.files[0];

      if (!file) {
        e.preventDefault();
        alert("No file chosen");
        return;
      }

      if (file.size > 1024 * 1024) {
        e.preventDefault();
        alert("File too big (> 1MB)");
        return;
      }

      alert("File OK");
    },
    async fetchCountries() {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/"
        );

        this.countries = response.data.data.map((country) => country.country);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    },
    async fetchCities() {
      try {
        if (this.selectedCountry) {
          const response = await axios.post(
            `https://countriesnow.space/api/v0.1/countries/cities`,
            {
              country: this.selectedCountry,
            }
          );
          this.cities = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    },

    async createCompany() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        const responseCompany = await axios.post(
          "http://localhost:5000/api/companies/add",
          {
            name: this.company.name,
            description: this.company.description,
            industry: this.company.industry,
            technology: this.company.technology,
            ceo: this.company.ceo,
            website: this.company.website,
            location: `${this.selectedCity}, ${this.selectedCountry}`,
          }
        );

        if (responseCompany.data.message === "Company already exists") {
          this.isError = true;
          return;
        }

        const companyId = responseCompany.data.company_id;
        if (this.logo) {
          const logoFormData = new FormData();
          logoFormData.append("logo", this.logo);
          logoFormData.append("company_id", companyId);

          await axios.post(
            "http://localhost:5000/api/companies/logo/upload",
            logoFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        const addRepresenativeOfCompany = await axios.post(
          "http://localhost:5000/api/representatives/add",
          {
            company_id: companyId,
          }
        );

        this.result = true;
        this.$router.push(`/company/${companyId}`);
      } catch (err) {
        const error = err.response.data.message;
        console.error("Error creating company:", error);
        if (error === "Company already exists!") {
          this.isError = true;
        }
      }
    },

    handleLogoUpload(event) {
      this.logo = event.target.files[0];
      if (this.logo && this.logo.size > 1000000) {
        alert("File too large! Please upload a file smaller than 1MB");
        return;
      }
      if (
        this.logo &&
        this.logo.type !== "image/png" &&
        this.logo.type !== "image/jpeg"
      ) {
        alert("Please upload a file of type .png or .jpeg");
        return;
      }
    },
  },
  mounted() {
    this.fetchCountries();
    this.industryHinting;
  },
};
</script>
