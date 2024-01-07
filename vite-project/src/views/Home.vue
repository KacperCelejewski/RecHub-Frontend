<template>
  <Logout />
  <div class="flex justify-around font-roboto-1">
    <div
      class="block w-1/2 bg-black h-screen border-solid border-4 border-white rounded-lg"
    >
      <div class="w-full grid grid-cols-2 grid-rows-1">
        <div class="flex justify-start w-1/2 relative overflow-hidden">
          <img
            class="object-cover object-center aspect-[5/4] w-full h-full"
            src="../assets/RecoHub (1).png"
            alt=""
          />
        </div>

        <div class="col-span-1 text-white flex justify-end">
          <router-link :to="{ name: 'Login' }">
            <p class="p-3 text-end max-w-[60px]">Login</p>
          </router-link>
          <router-link :to="{ name: 'register' }">
            <p class="p-3 text-end max-w-[90px]">Register</p>
          </router-link>
          <router-link :to="{ name: 'create-company' }">
            <p class="p-3 mr-6 text-end max-w-[90px]">For Companies</p>
          </router-link>
        </div>
      </div>
      <div
        class="p-4 w-full grid grid-rows-2 grid-cols-2 gap-1 h-2/5"
        id="industries"
      >
        <div
          class="rounded text-white hover:bg-yellow-500 hover:border-solid hover:border-2 hover:border-white bg-zinc-900 flex justify-center items-center"
        >
          <router-link
            :to="{ name: 'ParamCompanies', params: { industry: 'IT' } }"
          >
            <h1 class="text-xl">IT</h1></router-link
          >
        </div>

        <div
          class="rounded text-white hover:bg-yellow-500 hover:border-solid hover:border-2 hover:border-white bg-zinc-800 flex justify-center items-center"
        >
          <router-link
            :to="{ name: 'ParamCompanies', params: { industry: 'Finance' } }"
          >
            <h1 class="text-xl">Finance</h1></router-link
          >
        </div>
        <div
          class="rounded text-white hover:bg-yellow-500 hover:border-solid hover:border-2 hover:border-white bg-zinc-700 flex justify-center items-center"
        >
          <router-link
            :to="{ name: 'ParamCompanies', params: { industry: 'HR' } }"
          >
            <h1 class="text-xl">HR</h1></router-link
          >
        </div>
        <div
          class="rounded text-white hover:bg-yellow-500 hover:border-solid hover:border-2 hover:border-white bg-zinc-600 flex justify-center items-center"
        >
          <router-link
            :to="{ name: 'ParamCompanies', params: { industry: 'HR' } }"
          >
            <h1 class="text-xl">Marketing</h1></router-link
          >
        </div>
      </div>
    </div>

    <form action="" class="w-1/2 flex items-center">
      <div class="flex flex-col items-center w-full">
        <input
          v-model="companyName"
          class="mb-4 placeholder:text-stone-950 rounded border-solid border-2 border-black p-2 placeholder:text-center placeholder:italic placeholder:text-sm w-9/12"
          type="search"
          placeholder="Search for best companies in your city"
        />
        <button
          @click="filterCompanies()"
          class="bg-black text-white rounded p-2 w-4/12"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const companyName = ref("");
    const companies = ref([]);

    const burgerParts = ref([
      "TOP 100",
      "Categories",
      "About Us",
      "Contact Us",
    ]);
    const router = useRouter();
    const getCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/companies/");
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
        router.push({ name: "company", params: { id: filteredCompany.id } });
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
