<template>
<li :class="class_li">
    {{ pokemon.name | capitalize }}

    <v-btn
        class="mx-2"
        fab
        small
        color="F5F5F5"
        elevation="0"
        @click="set_favorite"
    >
        <v-icon :color="favorite ? '#ECA539' : '#BFBFBF'">
            mdi-star
        </v-icon>
    </v-btn>
</li>
</template>

<script>
export default {
    name: 'pokemonlist',
    props: {
        pokemon: {
            type: Object,
            default: {}
        },
        
        data_favs: {
            type: Object,
            default: {}
        },
    },

    watch: {
        pokemon() {
            this.favorite = this.data_favs[this.pokemon.name];
        }
    },

    data: () => ({
        favorite: false,
    }),

    methods: {
        set_favorite() {
            let data = {
                pokemon: this.pokemon,
                action: !this.favorite
            }
            this.$store.dispatch('upd_favorites', data);
            this.favorite = !this.favorite;
            this.$emit('get_favs');
        },
    },
    
    computed: {
        class_li() {
            return 'd-flex justify-space-between align-center mb-2';
        },
    }
}
</script>

<style scoped>
.list li {
    background: white;
    padding: 5px 10px;
    font-size: 22px;
    border-radius: 5px;
}
</style>