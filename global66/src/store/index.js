import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const _API_ = 'https://pokeapi.co/api/v2/pokemon/';

export default new Vuex.Store({
  state: {
    pokemons: [],
    favorites: {},
    pages: {},
    data_modal: {}
  },
  mutations: {
    upd_data_pokemons(state, arr) {
      if(arr.results)
        state.pokemons = [...arr.results];
      
        state.pages.next = arr.next;
        state.pages.previous = arr.previous;
    },
    
    upd_data_modal(state, data) {
        state.data_modal = { ...data };
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
      return fetch(`${_API_}${url}`)
        .then(response => response.json())
        .then((data) => {
          let commit_function = data.sprites ? 'upd_data_modal' : 'upd_data_pokemons';
          commit(commit_function, data);
          return true;
        })
        .catch(err => {
          console.log(err);
          return false;
        });
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
    
    data_modal: (state) => {
      return state.data_modal;
    },
    
    url_api: () => {
      return _API_;
    },
  }
})
