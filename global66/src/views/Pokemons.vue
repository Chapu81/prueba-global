<template>
<div>
    <loader-c v-if="loading"/>
</div>
</template>

<script>
import Loader from '../components/Loader.vue'
export default {
    name: 'pokemons',
    components:{
        'loader-c': Loader,
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
    }),

    methods: {
        async get_data() {
            await this.$store.dispatch('get_pokemons');
        },
    },

    computed: {
        pokemons() {
            return this.$store.getters.pokemons;
        },
        
        pages() {
            return this.$store.getters.pages;
        },
    }

}
</script>

<style scoped>

</style>