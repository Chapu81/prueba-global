<template>
<div>
    <loader-c v-if="loading"/>
    <section class="container-list">
        <div class="max-width pb-0">
            <v-text-field
                solo
                dense
                clearable
                label="Search"
                color="none"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
                @keypress.enter="search_api"
            ></v-text-field>
        </div>

        <div class="max-width list py-0" v-if="!no_data">
            <ul>
                <template v-for="(pokemon, key) in pokemon_list">
                    <list-c :key="key" 
                        :pokemon="pokemon"
                        :data_favs="data_favs"
                        @get_favs="get_favs"
                        @open_modal="get_data(pokemon.url, true)" />
                </template>
            </ul>

            <div class="max-width d-flex justify-space-between align-center pa-0 pb-2" v-if="view_all">
                <template v-for="(btn, key) in btn_pages">
                    <v-btn
                        rounded
                        :dark="pages[btn] ? true : false"
                        class="btn"
                        :key="btn"
                        color="#F22539"
                        :disabled="!pages[btn] ? true : false"
                        @click="get_data(pages[btn])"
                    >
                        <v-icon
                            dark
                            v-if="!key"
                        >
                            mdi-chevron-left
                        </v-icon>
                        
                        {{ btn | capitalize}}

                        <v-icon
                            dark
                            v-if="key"
                        >
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                </template>
            </div>
        </div>
        
        <div class="btns" v-if="!no_data">
            <div class="max-width d-flex justify-space-between align-center">
                <template v-for="(btn, key) in btn_view">
                    <v-btn
                        rounded
                        dark
                        class="btn"
                        :key="key"
                        :color="btn.color"
                        @click="set_view_all(btn.view_all)"
                    >
                        <v-icon
                            left
                            dark
                        >
                            {{ btn.icon }}
                        </v-icon>
                        {{ btn.text }}
                    </v-btn>
                </template>
            </div>
        </div>

        <div class="no-data text-center" v-if="no_data">
            <p class="bolder mb-0">Uh-oh!</p>
            <p>You look lost on your journey!</p>
            <v-btn
                rounded
                dark
                :color="color_red"
                @click="back_home"
            >
                Go back home
            </v-btn>
        </div>
    </section>

    <modal-c :open_modal="open_modal" :data_favs="data_favs" :pokemon="data_modal" @get_favs="get_favs" />
</div>
</template>

<script>
import List from '../components/List.vue'
import Modal from '../components/Modal.vue'
export default {
    name: 'pokemons',
    components:{
        'list-c': List,
        'modal-c': Modal,
    },

    watch: {
        pokemons() {
            if(!this.pokemons.length) {
                this.no_data = true;
            }
                this.loading = false;
        },

        data_modal() {
            this.open_modal = !this.open_modal;
        }
    },

    created() {
        this.get_data(false);
    },

    data: () => ({
        loading: true,
        view_all: true,
        data_favs: {},
        array_favorites: [],
        search: '',

        open_modal: false,
        color_red: '#F22539',
        color_gray: '#BFBFBF',
        no_data: false,
    }),

    methods: {
        async get_data(url, modal) {
            this.loading = true;
            let url_api = '';
            if(url) {
                let param_url = url.split('https://pokeapi.co/api/v2/pokemon/');
                url_api = param_url[param_url.length - 1];
            }
            let res = await this.$store.dispatch('get_pokemons', url_api, modal);
            this.loading = false;
            if(!res) {
                this.no_data = true;
            }

            if(!modal)
                this.scroll_top_list();
        },

        scroll_top_list() {
            var elmnt = document.querySelector('.list');
            if(elmnt)
                elmnt.scrollTop = 0;
        },

        set_view_all(state) {
            this.view_all = state;
        },
        
        search_api(){
            this.get_data(this.search, false)
        },

        get_favs() {
            this.data_favs = {...this.$store.getters.favorites};
            this.array_favorites = Object.values(this.data_favs);
        },

        back_home() {
            this.get_data(false);
            this.no_data = false;
        }
    },

    computed: {
        data_modal() {
            return this.$store.getters.data_modal;
        }, 

        pokemons() {
            return this.$store.getters.pokemons;
        },

        pokemon_list() {
            return this.view_all ? this.pokemons : this.array_favorites;
        },
        
        pages() {
            return this.$store.getters.pages;
        },

        btn_view() {
            return [
                {
                    icon: 'mdi-format-list-bulleted-square',
                    text: 'All',
                    color: this.view_all ? this.color_red : this.color_gray,
                    view_all: true,
                },
                {
                    icon: 'mdi-star',
                    text: 'Favorites',
                    color: !this.view_all ? this.color_red : this.color_gray,
                    view_all: false
                },
            ]
        },
        
        btn_pages() {
            return [
                'previous',
                'next',
            ]
        },
    },
}
</script>

<style scoped>
.container-list {
    background: #E5E5E5;
    width: 100%;
    height: 100vh;
}

.max-width {
    padding: 15px;
    max-width: 600px;
    margin: 0 auto;
}

.btns {
    background: white;
}

.v-btn {
    letter-spacing: 0px;
    text-transform: none;
    width: 48%;
    max-width: 275px;
    height: 44px;
}

.list {
    padding-right: 11px;
    height: calc(100vh - 160px);
    overflow-y: scroll;
    margin-bottom: 15px;
}

.no-data p:first-of-type {
    font-size: 36px;
}

.no-data p:last-of-type {
    font-size: 20px;
    margin-bottom: 25px;
}


</style>