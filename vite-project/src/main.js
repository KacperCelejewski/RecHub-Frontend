import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import './index.css'
import Home from './views/Home.vue'
import CompanyDetail from './views/CompanyDetail.vue'
import ParamCompanies from './views/ParamCompanies.vue'
import addOpinion from './components/addOpinion.vue';
import Login from './views/Login.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/company/:id', name: 'company', component: CompanyDetail },
        { path: '/companies/:industry', name: 'ParamCompanies', component: ParamCompanies},
        { path: '/login', name: 'Login', component: Login}
    ]
});
const app = createApp(App)
app.use(router);
app.component('addOpinion', addOpinion)
app.mount('#app')

export default router;