<template>
  <div v-if="modal===false" class="company-detail">
    <h1>{{ company.name }}</h1>
    <p>{{ company.description }}</p>
    <h1>Opinions</h1>
    <div v-if="opinions.length>0 " class="bg-slate-400 mb-2" v-for="opinion in opinions" :key="opinion.id">
      
        <p>{{ opinion.content }}</p>
      <p>{{ opinion.posted_date }}</p>
      <p>Author: {{opinion.author_id}}</p>
      <p> <blockquote>"<i>{{opinion.content}}</i>"</blockquote></p>
      <div class="flex"  v-if="opinion.rating === 5">
        <div class="w-fit mr-2" v-for="index in opinion.rating" :key="index" :id="'rating-' + index">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="18"
            viewBox="0 0 576 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            />
          </svg>
        </div>
      </div>
      </div>
      
      <div v-else>Opinions not found</div>
      <button @click="modal = !modal">Add opinion</button>
    </div>
    <div v-else >
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
      },
      opinions: [],
      modal: false,
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
