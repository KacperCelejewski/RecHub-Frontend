<template>
  <div class="company-detail">
    <h1>{{ company.name }}</h1>
    <p>{{ company.description }}</p>
   
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
                website: ''
            }
        };
    },
    async mounted() {
        try {
            const companyId = this.$route.params.id;
            const response = await axios.get(`http://localhost:5000/api/companies/${companyId}`);
            const company = response.data.company;
            console.log(company); // Log the response
            this.company = company;
        } catch (err) {
            console.error(err);
        }
    },
};
</script>
