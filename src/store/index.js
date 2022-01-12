import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import {Message, Loading} from "element-ui";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        roles: JSON.parse(localStorage.getItem('roles')) || [],
        loading: {},
        me: JSON.parse(localStorage.getItem('me')) || {}
    },
    mutations: {
        setLoading(state) {
            state.loading = Loading.service({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        },
        unsetLoading(state) {
            state.loading.close()
        },
        setToken (state, token) {
            state.token = token
        },
        setRoles (state, roles) {
            state.roles = roles
        },
        setMe (state, me) {
            state.me = me
        }
    },
    getters: {},
    actions: {
        setSuccessMessage () {
            Message({
                message: 'Success',
                type: 'success',
                center: true
            })
        },
        setErrorMessage (context, message = null) {
            Message({
                message: message ?? 'Error',
                type: 'error',
                center: true
            })
        },
    },
    modules
})
