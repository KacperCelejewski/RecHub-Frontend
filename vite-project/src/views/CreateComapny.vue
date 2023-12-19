<template>
  <div class="flex flex-col items-center justify-center">
    <p v-if="message === 'User logged in!'"></p>
    <h1>Let's start with a few infos about your company</h1>
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

      <label for="companyLocation">Company location</label>
      <input
        type="text"
        v-model="company.location"
        id="companyLocation"
        placeholder="(e.g., City, Country"
        class="w-10/12 transition ease-in delay-100 duration-300 focus:w-full focus:bg-fourth focus:text-secondary focus:outline-none focus:ring-2 focus:ring-fourth"
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
        v-model="company.industry"
        id="companyIndustry"
        placeholder="Company industry"
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
      <label
        for="companyLogo"
        class="mt-3 p-1 rounded cursor-pointer bg-fourth text-secondary"
        >Upload yout logo
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
  <div class="flex justify-center">
    <select v-model="selectedCountry" @change="fetchCities">
      <option value="" disabled selected>Select your country</option>
      <option v-for="country in countries" :key="country.code" :value="country">
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
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/",
          {}
        );

        console.log(response.data.data);
        console.log(this.selectedCountry);
        for (let i = 0; i < response.data.data.length; i++) {
          this.countries.push(response.data.data[i].country);
        }
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
          console.log(response.data);
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

        // Step 1: Create the company
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
        console.log("Company response:", responseCompany);

        // Step 2: Upload the logo
        const companyId = responseCompany.data.company_id;
        if (this.logo) {
          const logoFormData = new FormData();
          logoFormData.append("logo", this.logo);
          logoFormData.append("company_id", companyId);

          const responseLogo = await axios.post(
            "http://localhost:5000/api/companies/logo/upload",
            logoFormData,

            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Logo response:", responseLogo);
        }
      } catch (err) {
        console.error(err);
      }
    },
    handleLogoUpload(event) {
      this.logo = event.target.files[0];
    },
  },
  mounted() {
    this.fetchCountries();
  },
};
</script>
