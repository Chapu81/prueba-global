<template>
<div>
    <ul>
        <template v-for="(pokemon, key) in pokemons">
            <list-c :key="key" 
                :pokemon="pokemon"
                :data_favs="data_favs"
                @get_favs="get_favs" />
        </template>
    </ul>
</div>
</template>

<script>
import List from './List.vue'
export default {
    name: 'pokemonlist',
    props: {
        pokemons: {
            type: Array,
            default: []
        },
    },

    components: {
        'list-c': List,
    },

    data: () => ({
        data_favs: {},
    }),

    methods:{
        get_favs() {
            this.data_favs = this.$store.getters.favorites;
        },
    }
}
</script>

<style scoped>
.v-application ul, .v-application ol {
    padding-left: 0px;
}
</style>