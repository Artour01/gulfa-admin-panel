// import api from "@/service/api";

import api from "@/service/api";
import {search} from '@/service/search'

export default {
    state: () => ({
        data: [],
        dataAr: [],
        currentSale: null
    }),
    mutations: {
        setSales(state, {data, lang}) {
            if(lang === 'en') {
                state.data = data
            } else if (lang === 'ar') {
                state.dataAr = data
            }
        },
        setCurrentSale(state, data) {
            state.currentSale = data
        }
    },
    actions: {
        async getSales({commit, rootState}) {
            await api.GET('/sale', rootState.token)
                .then(({data}) => commit('setSales', {data, lang: 'en'}))
                .catch(err => console.log(err))
            await api.GET('/sale?culture=ar', rootState.token)
                .then(({data}) => commit('setSales', {data, lang: 'ar'}))
                .catch(err => console.log(err))
        },
        async postSale({dispatch, rootState, commit}, {data}) {
            commit('setLoading')
            try {
                await api.POST('/sale', data, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async putSale({dispatch, rootState, commit}, {data, id}) {
            commit('setLoading')
            try {
                await api.PUT(`/sale/${id}`, data, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        async deleteSale({rootState, dispatch, commit}, id) {
            commit('setLoading')
            try {
                await api.DELETE(`/sale/${id}`, rootState.token)
                await dispatch('getSales')
                dispatch('setSuccessMessage')
            } catch {
                dispatch('setErrorMessage')
            } finally {
                commit('unsetLoading')
            }
        },
        setCurrentSale({commit, state}, id = null) {
            if (id === null) commit('setCurrentSale', null)
            else {
                let el = state.data.find(el => el.id === id)
                let index = state.data.findIndex(el => el.id === id)
                let orders = []
                if (el.shopItems.length) {
                    orders = el.shopItems.map(order => order.id)
                }
                let data = {
                    title_en: el?.title ?? '',
                    title_ar: state.dataAr[index]?.title ?? '',
                    percent: String(el.percent),
                    startDate: el.startDate.substring(0,10),
                    endDate: el.endDate.substring(0,10),
                    description_en: el?.description ?? '',
                    description_ar: state.dataAr[index]?.description ?? '',
                    shopItemsId: orders
                }
                commit('setCurrentSale', data)
            }
        },
    },
    getters: {
        getReformatSales(state) {
            return (searchString) => {
                return state.data.map((el, index) => {
                    let orders = []
                    if (el.shopItems.length) {
                        orders = el.shopItems.map(order => {
                            return {
                                id: order.id,
                                title: order.title,
                                image: order.imageUri,
                                volume: `${order.volume}LT`,
                                price: `${(order.price * (1 - 0.01 * el.percent)).toFixed(2)}د.إ`
                            }
                        })
                    }
                    return {
                        id: el.id,
                        title: {
                            en: el?.title ?? '',
                            ar: state.dataAr[index]?.title ?? ''
                        },
                        percent: String(el.percent),
                        startDate: new Intl.DateTimeFormat('en-GB').format(new Date(el.startDate)),
                        endDate: new Intl.DateTimeFormat('en-GB').format(new Date(el.endDate)),
                        description: {
                            en: el?.description ?? '',
                            ar: state.dataAr[index]?.description ?? ''
                        },
                        products: orders
                    }
                }).filter(el => {
                    return search([el?.title.en, el?.title.ar], searchString)
                })
            }
        },
        getCurrentSale(state) {
            // eslint-disable-next-line no-unused-vars
            let {id, ...data} = state.currentSale
            return data
        }
    }
}
