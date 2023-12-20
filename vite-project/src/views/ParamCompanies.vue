<template>
    <Logout />
    <div class="param-companies  ">
        <h1 class="text-xl text-center p-2">Companies in {{ industry }} industry </h1>
        <ul class="rounded grid p-5   p-2 gap-2 grid-cols-2 auto-rows-max">
            <li class="p-2 rounded bg-third text-secondary" v-for="company in companies" :key="company.id">




                <p class="font-semibold text-center text-fourth">{{ company.name }}</p>

                <p class="text-sm ">
                <div class="p-2 flex jusstify-center "><svg xmlns="http://www.w3.org/2000/svg" height="16" width="12"
                        viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                        <path
                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <h2 class="ml-2 -translate-y-0.5 text-fourth">{{ company.location }}</h2>
                </div>
                </p>

                <p  class="text-sm ml-2 "><h2 class="text-fourth mb-2">We work with:</h2><svg v-if="company.technology === 'Python'" xmlns="http://www.w3.org/2000/svg" height="16"
                        width="14"
                        viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                        <path
                            d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 .1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                    </svg></p>
                <router-link  :to="{ name: 'company', params: { id: company.id } }">
                    <div class="pr-2 pb-2 flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg></div>

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
                'industry': industry,
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

