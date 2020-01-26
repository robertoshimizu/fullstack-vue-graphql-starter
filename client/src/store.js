import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

import { defaultClient as apolloClient } from "./main";

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts:[],
    user: null,
    loading: false,
  },
  mutations: {
    setPosts:(state, payload) => {
      state.posts = payload;
    },
    setUser:(state, payload)=>{
      state.user = payload;
    },
    setLoading:(state, payload) => {
      state.loading = payload;
    },
    clearUser: state => (state.user = null)
  },
  actions: {
    getCurrentUser:({ commit }) => {
      commit('setLoading', true);
      apolloClient
      .query({
        query: GET_CURRENT_USER
      })
      .then(({ data })=>{
        commit('setLoading', false);
        // Add user data to state
        commit('setUser', data.getCurrentUser);
        console.log(data.getCurrentUser);
      })
      .catch((err)=>{
        commit('setLoading', false);
        console.log(err);
      });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          // Get data from actions and pass them to "state" via mutations
          // commit passes data from actions along to mutation functions
          commit('setPosts', data.getPosts);
          commit('setLoading',false);
          console.log(data.getPosts);
        })
        .catch(err => {
          commit('setLoading',false);
          console.error(err);
        });
    },
    signinUser:({commit}, payload)=>{
      apolloClient
      .mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
      .then(({data})=>{
        console.log(data.signinUser);
        // Add token to browser's local storage
        localStorage.setItem("token", data.signinUser.token);

        // to make sure created method is run in main.js (we run getCurrentUser),
        // reload the page
        router.go();

      })
      .catch((err)=>{
        console.log(err);
      })
    },
    signoutUser:({ commit })=>{
      // clear user in state
      commit('clearUser');
      // remove token in localstorage
      localStorage.removeItem('token','');
      // end session
      apolloClient.resetStore();
      // redirect home
      router.push('/')

    },
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts,
    loading: state => state.loading
  }
});