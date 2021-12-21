import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: () => ({
        notifications: []
    }),
    mutations: {
        setNotifications(state, data) {
            state.notifications = data
        }
    },
    actions: {
        async fetchNotifications({commit, rootState}) {
            await api.GET('/Notifications', rootState.token)
                .then(({data}) => {
                    commit('setNotifications', data)
                })
                .catch(console.dir)
        },
        async postNewNotification({dispatch, rootState, commit}, data) {
            commit('setLoading')
            try {
                await api.POST('/Notifications', data, rootState.token)
                await dispatch('fetchNotifications')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteNotification({dispatch, rootState}, id) {
            await api.DELETE(`/Notifications/${id}`, rootState.token)
                .then(() => {
                    dispatch('fetchNotifications')
                })
                .catch(console.dir)
        }
    },
    getters: {
        getNotifications(state) {
            return (searchString) => {
                return state.notifications.map(el => {
                    let {postedTime, body, id} = el
                    postedTime = new Date(`${postedTime}Z`)
                    postedTime = new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                        hour: 'numeric', minute: 'numeric', hour12: true
                    }).format(postedTime).toUpperCase()
                    return {postedTime, body, id}
                }).filter(el => {
                    return search([el.body], searchString)
                })
            }
        },
    }
}
