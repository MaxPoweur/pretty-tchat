import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import storeConfig from "@assets/scripts/initialStore.js";
import ThemeMixin from '@mixins/ThemeMixin.js';

import { split } from 'apollo-link';
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueApollo);

const wsLink = new WebSocketLink({
    uri: `wss://adam-test-hasura.herokuapp.com/v1/graphql`,
    options: {
        timeout: 60000,
        reconnect: true
    }
});

// const httpLinkWithSubscriptions = addGraphQLSubscriptions(wsClient);

// Create an http link:
const httpLink = new HttpLink({
    uri: "https://adam-test-hasura.herokuapp.com/v1/graphql"
});

const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

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
