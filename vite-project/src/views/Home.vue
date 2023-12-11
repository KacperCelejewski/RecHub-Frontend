<template>
  <div class="flex justify-around">
    
    <div class="flex w-1/2 bg-black h-screen border-solid border-4 border-white rounded-lg">
     <div class="relative w-full">
      <img class="absolute w-3/4 aspect-[5/4]" src="../assets/RecoHub (1).png" alt="">
      </div>
      <div>

      <div id="burgerContent" class="w-full p-3 mr-24 mt-3 border-2 border-aolid border-white rounded">
        <ul>
          <li class="text-white" v-for="burgerPart in burgerParts">
            {{ burgerPart }}
          </li>
        </ul>
        
      </div>
    </div>
  </div>

    <form action="" class="w-10/12 flex items-center">
      <div class="flex flex-col items-center w-full">
        <input v-model="companyName" class="mb-4 placeholder:text-stone-950 rounded border-solid border-2 border-black p-2 placeholder:text-center placeholder:italic placeholder:text-sm w-9/12" type="search" placeholder="Search for best companies in your city" />
        <button @click="filterCompanies()" class="bg-black text-white rounded p-2 w-4/12">Search</button>
      </div>
    </form>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const companyName = ref('');
    const companies = ref([]);

    const burgerParts = ref(['TOP 100', 'Categories', 'About Us', 'Contact Us']);
    const router = useRouter();
    const getCompanies = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/companies/');
    console.log(res.data); // Log the response
    companies.value = res.data.companies;
  } catch (err) {
    console.error(err);
  }
};

    const filterCompanies = () => {
      const filteredCompany = companies.value.find(
        (company) => company.name === companyName.value
      );
      console.log(filteredCompany);
      if (filteredCompany) {
        router.push({ name: 'company', params: { id: filteredCompany.id } });
      }

    };

    onMounted(() => {
      getCompanies();
    });

    return {
      companyName,
      companies,
      filterCompanies,
      burgerParts,
    };
  },
};
</script>