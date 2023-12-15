<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl text-fourth">Register</h1>
        <form @submit.prevent="register" class="flex flex-col items-center justify-center">
            <label for="username">Name</label>
            <input type="text" id="username" v-model="user.name" />
            <label for="email">Email</label>
            <input type="text" id="email" v-model="user.email" />
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password" />
            <label for="surrname">Surname</label>
            <input type="text" id="surrname" v-model="user.surname" />
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            user: {
                name: "",
                surname: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post(
                    `http://localhost:5000/api/auth/register`,
                    {
                        name: this.user.name,
                        surrname: this.user.surname,
                        email: this.user.email,
                        password: this.user.password,
                    }
                );
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        },
    },
};
</script>