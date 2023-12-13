<template>
    <div class="company-detail">
      <h1>{{ company.name }}</h1>
      <p>{{ company.description }}</p>
      <img v-if="company.logo" :src="company.logo" alt="Company Logo" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
      data() {
          return {
              company: {
                  name: '',
                  description: '',
                  location: '',
                  website: '',
                  logo: null
              }
          };
      },
      async mounted() {
          try {
              const companyId = this.$route.params.id;
              const response = await axios.get(`http://localhost:5000/api/companies/${companyId}`);
              const company = response.data.company;
              console.log(company); 
              this.company = company;
          } catch (err) {
              console.error(err);
          }
          try {
            const companyId = this.$route.params.id;
              const logoResponse = await axios.get(`http://localhost:5000/api/companies/logo/${companyId}`);
              console.log(logoResponse.data);
  
              this.company.logo = `data:${logoResponse.data.logo.mimetype};base64,${logoResponse.data.logo.logo}`;
          } catch (error) {
              console.error('Error fetching logo data', error);
          }
      },
  };
  </script>
  