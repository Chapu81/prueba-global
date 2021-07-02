import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const _API_ = 'https://pokeapi.co/api/v2/pokemon/';

export default new Vuex.Store({
  state: {
    pokemons: [],
    pages: {}
  },
  mutations: {
    upd_data_pokemons(state, arr) {
      if(arr.results)
        state.pokemons = [...arr.results];
      
      if(arr.next)
        state.pages.next = arr.next;
      
      if(arr.previous)
        state.pages.previous = arr.previous;
    },
  },
  actions: {
    get_pokemons({ commit }, url) {
      let url_api = url ? url : _API_;
      fetch(url_api)
        .then(response => response.json())
        .then(data => {
          commit('upd_data_pokemons', data);
        })
        .catch(err => console.log(err));
    }
  },
  modules: {
  },
  getters: {
    pokemons: (state) => {
      return state.pokemons;
    },
    
    pages: (state) => {
      return state.pages;
    },
  }
})
