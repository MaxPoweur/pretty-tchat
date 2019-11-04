import {LOGIN, LOGOUT} from  '@assets/scripts/mutationTypes.js';
import createPersistedState from 'vuex-persistedstate';

export default {
    state: {
        username: null,
        theme: null
    },
    getters: {
        username: (state, getters) => {
            return state.username;
        },
        logged: (state, getters) => {
            return getters.username != null;
        }
    },
    mutations: {
        [LOGIN]: (state, username) => {
            state.username = username;
        },
        [LOGOUT]: state => {
            state.username = null;
        },
        setTheme: (state, {name}) => {
            state.theme = name;
        }
    },
    plugins: [createPersistedState()]
}