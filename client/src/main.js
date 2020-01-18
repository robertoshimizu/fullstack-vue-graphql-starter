import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill';

// Import Apollo plugin
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

// Install the plugin into Vue
Vue.use(VueApollo);

// Set up ApolloClient
export const defaultClient = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // if no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }

    // operation adds the token to an authorization header, which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[networkError]", networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  }
});

// Instantiate a new ApolloClient in a variable
const apolloProvider = new VueApollo({defaultClient});

Vue.config.productionTip = false

new Vue({
  // injects apollo client into Vue components
  provide: apolloProvider.provide(),
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
