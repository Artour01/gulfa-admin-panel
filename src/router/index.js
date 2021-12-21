import Vue from 'vue'
import VueRouter from "vue-router";
import Promo from "@/views/Promo";

Vue.use(VueRouter)

const Auth = () => import('../views/Auth')
const Orders = () => import('../views/Orders')
const Drivers = () => import('../views/Drivers')
const Notifications = () => import('../views/Notifications')
const Payments = () => import('../views/Payments')
const Products = () => import('../views/Products')
const Sale = () => import('../views/Sale')
const Users = () => import('../views/Users')
const Banners = () => import('../views/Banners')
const Cities = () => import('../views/Cities')
const Employee = () => import('../views/Workers')

const routes = [
    {path: '/', redirect: '/products'},
    {path: '/auth', meta: {layout: 'auth'}, redirect: '/auth/signin'},
    {name: 'auth',path: '/auth/:mode', meta: {layout: 'auth'}, component: Auth},
    {name: 'drivers',path: '/drivers', meta: {layout: 'main'}, component: Drivers,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'orders',path: '/orders', meta: {layout: 'main'}, component: Orders,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'notifications',path: '/notifications', meta: {layout: 'main'}, component: Notifications,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'payments',path: '/payments', meta: {layout: 'main'}, component: Payments,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'products',path: '/products', meta: {layout: 'main'}, component: Products,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'sale',path: '/sale', meta: {layout: 'main'}, component: Sale,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'customers',path: '/customers', meta: {layout: 'main'}, component: Users,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'banners', path: '/banners', meta: {layout: 'main'}, component: Banners,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'cities', path: '/cities', meta: {layout: 'main'}, component: Cities,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'Employee', path: '/workers', meta: {layout: 'main'}, component: Employee,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('roles'))?.includes('GulfaOwner')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }},
    {name: 'promo', path: '/promo', meta: {layout: 'main'}, component: Promo,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('roles'))?.includes('GulfaOwner')) {
                next();
            } else {
                next({path: '/auth/signin'});
            }
        }}
]

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes
})
