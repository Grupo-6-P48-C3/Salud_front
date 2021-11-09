import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import SingUp from './components/SingUp.vue'
import Home from './components/Home.vue'
import GestionCitas from './components/GestionCitas.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/api/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/api/user/create/',
    name: 'SingUp',
    component: SingUp
  },
  {
    path: '/api/user/home/',
    name: 'Home',
    component: Home
  },
  {
    path: 'api/gestioncitas/list/',
    name: 'GestionCitas',
    component: GestionCitas
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router
