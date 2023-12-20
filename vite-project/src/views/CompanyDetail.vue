<template>
  <Logout />
    <div v-if="modal === false" class="company-detail flex justify-around ">
        <div id="details" class="ml-4 p-3">
            <img class="rounded-full w-[200px] aspect-square" v-if="company.logo" :src="company.logo" alt="Company Logo" />

            <h1 class="mt-8 font-extrabold text-2xl ">{{ company.name }}</h1>

            <div id="info">
                <p class="">
                <dl class="font-semibold">CEO:</dl>
                <dt>{{ company.ceo }}</dt>
                </p>
                <p>
                <dl class="font-semibold">What We do?</dl>
                <dt><i>{{ company.description }}</i></dt>
                </p>
                <p>
                    <dl class="font-semibold">Our Website:</dl>
                    <dt>{{ company.website }}</dt>
                    </p>
                <p>
                <dl class="font-semibold">We Work in:</dl>
                <dt>{{ company.location }}</dt>
                </p>

                <p>
                <dl class="font-semibold">Technologies We use:</dl>
                <dt>{{ company.technology }}</dt>
                </p>
                <p>
                    <dl class="font-semibold">Average rating:</dl>
                    <dt>{{ company.avg_rating }}</dt>
                    </p>
                <p class="bg-black text-white pl-2 pr-2 w-fit border-solid border-2 border-black">{{ company.industry }}</p>
                <button @click="modal= !modal">Share your thoughs about {{company.name}}</button>
            
              </div>
            
        </div>

        <div id="reviews" class= "rounded p-3 bg-third h-96 overflow-y-scroll h-max-screen mt-20">
            <h1>Opinions</h1>
            <div v-if="opinions.length > 0" class=" mb-2" v-for="opinion in opinions" :key="opinion.id">
                <p>{{ opinion.content }}</p>
                <p>{{ opinion.posted_date }}</p>
                <p>Author: {{ opinion.author_id }}</p>
                <p>
                <blockquote>"<i>{{ opinion.content }}</i>"</blockquote>
                </p>
                <div class="flex" v-if="opinion.rating === 5">
                    <div class="w-fit mr-2" v-for="index in opinion.rating" :key="index" :id="'rating-' + index">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                            <path
                                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                        </svg>
                    </div>
                </div>
            </div>
          
            <div v-else><p>Opinions not found</p>
          <button @click="modal= !modal">Share your thoughts</button>
            </div>
            

           

        </div>
       

    </div>
    <div v-else>
        <addOpinion></addOpinion>
    </div>
    

</template>

<script>
import axios from "axios";
import addOpinion from "../components/addOpinion.vue";
export default {
  data() {
    return {
      company: {
        name: "",
        description: "",
        location: "",
        website: "",
        industry: "",
        technology: "",
        avg_rating: "",
      },
      opinions: [],
      modal: false,
      logo: null
    };
  },
  async mounted() {
    try {
      const companyId = this.$route.params.id;
      const responseCompany = await axios.get(
        `http://localhost:5000/api/companies/${companyId}`
      );
      const company = responseCompany.data.company;
      console.log(company); // Log the response
      this.company = company;
    } catch (err) {
      console.error(err);
    }
    try {
      const companyId = this.$route.params.id;
      const logoResponse = await axios.get(`http://localhost:5000/api/companies/logo/${companyId}`);
              console.log(logoResponse.data);
    try{
        this.company.logo = `data:${logoResponse.data.logo.mimetype};base64,${logoResponse.data.logo.logo}`;
          } catch (error) {
              console.error('Error fetching logo data', error);
          }
      const responseOpinions = await axios.get(
        `http://localhost:5000/api/opinions/${companyId}`,
        {}
      );
      const opinions = responseOpinions.data.opinions;
      console.log(opinions); // Log the response
      this.opinions = opinions;
    } catch (err) {
      console.error(err);
    }

  },
};
</script>
