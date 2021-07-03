<template>
<div>
    <loader-c v-if="loading"/>
    <section class="container-list">
        <div class="max-width pb-0">
            <v-text-field
                solo
                dense
                label="Search"
                color="none"
                prepend-inner-icon="mdi-magnify"
                v-model="search"
            ></v-text-field>
        </div>

        <div class="max-width list py-0">
            <ul>
                <template v-for="(pokemon, key) in pokemon_list">
                    <list-c :key="key" 
                        :pokemon="pokemon"
                        :data_favs="data_favs"
                        @get_favs="get_favs" />
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
        
        <div class="btns">
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
    </section>
</div>
</template>

<script>
import Loader from '../components/Loader.vue'
import List from '../components/List.vue'
export default {
    name: 'pokemons',
    components:{
        'loader-c': Loader,
        'list-c': List,
    },

    watch: {
        pokemons() {
            if(this.pokemons.length) {
                this.loading = false;
            }
        }
    },

    created() {
        this.get_data();
    },

    data: () => ({
        loading: true,
        view_all: true,
        data_favs: {},
        array_favorites: [],
        search: '',
    }),

    methods: {
        async get_data(url) {
            this.loading = true;
            let url_api = url ? url : '';
            await this.$store.dispatch('get_pokemons', url_api);
            this.loading = false;

            this.scroll_top_list();
        },

        scroll_top_list() {
            var elmnt = document.querySelector('.list');
            elmnt.scrollTop = 0;
        },

        set_view_all(state) {
            this.view_all = state;
        },
        
        /* array_favorites() {
            return Object.values(this.data_favs);
        }, */

        get_favs() {
            this.data_favs = this.$store.getters.favorites;
            this.array_favorites = Object.values(this.data_favs);
            console.log('get_favs');
        },
    },

    computed: {
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
                    color: this.view_all ? '#F22539' : '#BFBFBF',
                    view_all: true,
                },
                {
                    icon: 'mdi-star',
                    text: 'Favorites',
                    color: !this.view_all ? '#F22539' : '#BFBFBF',
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

.v-application ul, .v-application ol {
    padding-left: 0px;
}
</style>