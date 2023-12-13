<template>
    <h1>Add Opinion</h1>
    <form @submit.prevent="addOpinion">
        <label for="title">title</label>
        <input type="text" id="title" v-model="opinion.title" />
        <label for="content">content</label>
        <input type="text" id="content" v-model="opinion.content" />
        <label for="rating">rating</label>
        <input type="text" id="rating" v-model="opinion.rating" />
    
    
        <button type="submit">Add</button>
    </form>
    </template>
    <script>
    import axios from "axios";
    export default {
        data() {
            return {
                opinion: {
                    title: "",
                    content: "",
                    rating: "",
                    company_id: this.$route.params.id,
                },
            };
        },
        methods: {
            
            async addOpinion() {
                try {
                    const accessToken = localStorage.getItem("accessToken");
                    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    const response = await axios.post(
                        `http://localhost:5000/api/opinion/add`,
                        this.opinion
                    );
                    console.log(response);
                    console.log(this.$route.params.id);
                } catch (err) {
                    console.error(err);
                }
            },
        },
    };
    
    </script>