<template>
        <div>
                <h1>Let's start with a few infos about your company</h1>
                <form @submit.prevent="createCompany">
                        <label for="companyName">Company name</label>
                        <input type="text" v-model="company.name" id="companyName" placeholder="Company name">
                        
                        <label for="companyDescription">Company description</label>
                        <input type="text" v-model="company.description" id="companyDescription" placeholder="Company description">
                        
                        <label for="companyLocation">Company location</label>
                        <input type="text" v-model="company.location" id="companyLocation" placeholder="Company location">
                        
                        <label for="companyWebsite">Company website</label>
                        <input type="text" v-model="company.website" id="companyWebsite" placeholder="Company website">
                        
                        <label for="companyLogo">Company logo</label>
                        <input type="file" @change="handleLogoUpload($event)" id="companyLogo" placeholder="Company logo">
                        
                        <label for="companyIndustry">Company industry</label>
                        <input type="text" v-model="company.industry" id="companyIndustry" placeholder="Company industry">
                        
                        <label for="companyTechnology">Company technology</label>
                        <input type="text" v-model="company.technology" id="companyTechnology" placeholder="Company technology">
                        
                        <label for="companyCEO">Company CEO</label>
                        <input type="text" v-model="company.ceo" id="companyCEO" placeholder="Company CEO">
                        
                        <button type="submit">Create Company Profile</button>
                </form>
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
                location: "",
                website: "",
                industry: "",
                technology: "",
                ceo: ""
            },
            logo: null,
        };
    },
    methods: {
        async createCompany() {
            try {
                const accessToken = localStorage.getItem("accessToken");
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                // Step 1: Create the company
                const responseCompany = await axios.post(
                    "http://localhost:5000/api/companies/add",
                    this.company
                );
                console.log("Company response:", responseCompany);

                // Step 2: Upload the logo
                const companyId = responseCompany.data.company_id;
                if (this.logo) {
                    const logoFormData = new FormData();
                    logoFormData.append("logo", this.logo);
                    logoFormData.append("company_id", companyId)

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
};
</script>