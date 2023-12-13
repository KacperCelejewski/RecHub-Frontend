<template>
    <div class="param-companies">
        <h1 class="text-xl text-center p-2">Companies in {{industry}} industry </h1>
        <ul class="rounded grid bg-gray-300 p-2 gap-1 grid-cols-2 auto-rows-max">
        <li class="p-2 rounded bg-black text-white" v-for="company in companies" :key="company.id">
            
            <router-link :to="{ name: 'company', params: { id: company.id } }">

            <p>name:{{ company.name }}</p>
            <p>{{ company.ceo  }}</p>CEO: 
            <p>location: {{ company.location }}</p>
            <p>techstack: {{ company.technology }}</p>
            </router-link>
        </li>
    
        </ul>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const companies = ref([]);
const router = useRouter();
const industry = router.currentRoute.value.params.industry;
onMounted(async () => {
    try {
        const industry = router.currentRoute.value.params.industry;
        const response = await axios.get(`http://localhost:5000/api/companies/`, {
            params: {
                'industry':industry,
            },
        });
        const companiesData = response.data.companies;
        console.log(companiesData); // Log the response
        companies.value = companiesData;
    } catch (err) {
        console.error(err);
    }
});
</script>