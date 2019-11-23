import {LOGIN, LOGOUT} from  '@assets/scripts/mutationTypes.js';
import createPersistedState from 'vuex-persistedstate';

export default {
    state: {
        userData: null,
        theme: null
    },
    getters: {
        userData: (state, getters) => {
            return state.userData;
        },
        logged: (state, getters) => {
            return getters.userData != null;
        }
    },
    mutations: {
        [LOGIN]: (state, userData) => {
            state.userData = userData;
        },
        [LOGOUT]: state => {
            state.userData = null;
        },
        setTheme: (state, {name}) => {
            state.theme = name;
        }
    },
    plugins: [createPersistedState()]
}