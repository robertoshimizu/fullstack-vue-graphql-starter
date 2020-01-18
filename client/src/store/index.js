import Vue from "vue";
import Vuex from "vuex";

import { defaultClient as apolloClient } from "../main";

import { GET_POSTS, SIGNIN_USER } from '../queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts:[],
    loading: false,
  },
  mutations: {
    setPosts:(state, payload) => {
      state.posts = payload;
    },
    setLoading:(state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
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
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
});