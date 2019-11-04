import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import storeConfig from "@assets/scripts/initialStore.js";
import ThemeMixin from '@mixins/ThemeMixin.js';

import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueApollo);
// Create an http link:
const link = new HttpLink({
    uri: "https://adam-test-hasura.herokuapp.com/v1/graphql",
    fetch
});
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
        addTypename: true
    })
});

const apolloProvider = new VueApollo({
    defaultClient: client
});
const store = new Vuex.Store(storeConfig);

Vue.mixin(ThemeMixin);
new Vue({
    store,
    apolloProvider,
    render: h => h(App)
}).$mount("#app");
