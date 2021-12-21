import Vue from 'vue'
import VueRouter from 'vue-router'
import Promo from '@/views/Promo'

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
    {path: '/auth', meta: {layout: 'auth', name: 'SignIn'}, redirect: '/auth/signin'},
    {name: 'auth', path: '/auth/:mode', meta: {layout: 'auth', name: 'Auth'}, component: Auth},
    {
        name: 'drivers', path: '/drivers', meta: {layout: 'main', name: 'Drivers'}, component: Drivers,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'orders', path: '/orders', meta: {layout: 'main', name: 'Orders'}, component: Orders,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'notifications', path: '/notifications', meta: {layout: 'main', name: 'Notifications'}, component: Notifications,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'payments', path: '/payments', meta: {layout: 'main', name: 'Payments'}, component: Payments,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'products', path: '/products', meta: {layout: 'main', name: 'Products'}, component: Products,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'sale', path: '/sale', meta: {layout: 'main', name: 'Sale'}, component: Sale,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'customers', path: '/customers', meta: {layout: 'main', name: 'Customers'}, component: Users,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'banners', path: '/banners', meta: {layout: 'main', name: 'Banners'}, component: Banners,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'cities', path: '/cities', meta: {layout: 'main', name: 'Cities'}, component: Cities,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'Employee', path: '/workers', meta: {layout: 'main', name: 'Workers'}, component: Employee,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('roles'))?.includes('GulfaOwner')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
    {
        name: 'promo', path: '/promo', meta: {layout: 'main', name: 'Promo'}, component: Promo,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('roles'))?.includes('GulfaOwner')) {
                next()
            } else {
                next({path: '/auth/signin'})
            }
        },
    },
]

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes,
})
