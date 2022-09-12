import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import homePage from "@/components/home-page";
import deserversService from "@/components/deserversServices";
import dTable from "@/components/dtable";
import AllDeservers from "@/components/AllDeservers";
import login from "@/components/login";
import DServices from "@/components/DServices";
import Pays from "@/components/Pays";
import EmplloyeeServises from "@/components/EmplloyeeServises";
import allEmpl from "@/components/allEmpl";
import addempl from "@/components/addempl";
import Logo from "@/components/logo";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: homePage
  },
  
  {
    path: '/addempl',
    name: 'addempl',
    component: addempl
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmplloyeeServises
  },
  {
    path: '/allemple',
    name: 'allemple',
    component: allEmpl
  },
  {
    path: '/services',
    name: 'service',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: deserversService
  },
  {
    path: '/logo',
    name : 'logo' ,
    component: Logo
  },
  {
    path: '/d-table',
    name : 'd-table' ,
    component: dTable
  },
  {
    path: '/all-deserves',
    name : 'all-deserves' ,
    component: AllDeservers
  },
  {
    path  : '/' ,
    name: 'login',
    component: login
  },
  {
    path: '/d-Servises',
    name : 'd-Servise' ,
    component: DServices
  },
  {
    path: '/e-Pays',
    name : 'e-Pay' ,
    component: Pays
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
