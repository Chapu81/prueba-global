import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const _API_ = 'https://pokeapi.co/api/v2/pokemon/';

export default new Vuex.Store({
  state: {
    pokemons: [],
    favorites: {},
    pages: {}
  },
  mutations: {
    upd_data_pokemons(state, arr) {
      if(arr.results)
        state.pokemons = [...arr.results];
      
        state.pages.next = arr.next;
        state.pages.previous = arr.previous;
    },
    
    push_favorites(state, pokemon) {
        state.favorites[pokemon.name] = pokemon;
    },
    
    delete_favorites(state, pokemon) {
        delete state.favorites[pokemon.name];
    },
  },
  actions: {
    get_pokemons({ commit }, url) {
      commit('upd_data_pokemons', []);
      let url_api = url ? url : _API_;
      fetch(url_api)
        .then(response => response.json())
        .then(data => {
          commit('upd_data_pokemons', data);
        })
        .catch(err => console.log(err));
    },
    
    upd_favorites({ commit, state }, {action, pokemon}) {
      let action_favorites = action ? 'push_favorites' : 'delete_favorites';
      commit(action_favorites, pokemon);
    },
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
    
    favorites: (state) => {
      return state.favorites;
    },
  }
})
