import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import './index.css'
import Home from './views/Home.vue'
import CompanyDetail from './views/CompanyDetail.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/company/:id', name: 'company', component: CompanyDetail },
    ],
    
});
const app = createApp(App)
app.use(router);

app.mount('#app')

export default router;