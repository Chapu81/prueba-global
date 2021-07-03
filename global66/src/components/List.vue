<template>
<li :class="class_li" @click="open_modal" class="pointer">
    {{ pokemon.name | capitalize }}

    <btn-fav @set_favorite="set_favorite" :favorite="favorite" />
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
        },
        
        data_favs() {
            this.favorite = this.data_favs[this.pokemon.name];
        },
    },

    created() {
        this.favorite = this.data_favs[this.pokemon.name];
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

        open_modal() {
            this.$emit('open_modal');
        }
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