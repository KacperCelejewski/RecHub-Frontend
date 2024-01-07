import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import './index.css'
import Home from './views/Home.vue'
import CompanyDetail from './views/CompanyDetail.vue'
import ParamCompanies from './views/ParamCompanies.vue'
import addOpinion from './components/addOpinion.vue';
import Login from './views/Login.vue';
import CreateComapny from './views/CreateComapny.vue';
import Register from './views/Register.vue';
import { createStore } from 'vuex';
import Logout from './components/Logout.vue';
import PasswordResetEmail from './components/PasswordResetEmail.vue';
import ResetForm from './views/ResetForm.vue' 
import PasswordResetPassword from './components/PasswordResetPassword.vue';
const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
    console.log("Setting isLoggedIn to:", isLoggedIn);
      state.isLoggedIn = isLoggedIn;
    },
  },
});
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/company/:id', name: 'company', component: CompanyDetail },
        { path: '/companies/:industry', name: 'ParamCompanies', component: ParamCompanies},
        { path: '/login', name: 'Login', component: Login},
        { path: '/create-company', name: 'create-company', component: CreateComapny },
        { path: '/register', name: 'register', component: Register },
  
        { path: '/reset-password', name: 'PasswordReset', component: ResetForm },
        { path: '/reset-password/:token', name: 'PasswordResetPassword', component: PasswordResetPassword}
        
      ]
});
const app = createApp(App)
app.component('addOpinion', addOpinion)
app.component('Logout', Logout)
app.component('PasswordResetEmail', PasswordResetEmail)
app.component('PasswordResetPassword', PasswordResetPassword)
app.use(store);
app.use(router);


app.mount('#app')

export default router;