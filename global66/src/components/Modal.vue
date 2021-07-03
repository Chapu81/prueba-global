<template>
<v-dialog
    v-model="dialog"
    width="570"
>
    <v-card>
        <div class="bg-img d-flex justify-center align-center">
            <v-img
                max-height="180"
                max-width="180"
                :src="img_pokemon"
            ></v-img>
        </div>

        <div class="data">
            <ul>
                <template v-for="(data, key) in data_pokemon">
                    <li :key="key" class="py-2">
                        <span class="bolder">
                            {{ key | capitalize}}:
                        </span>
                        {{ data | capitalize }}
                    </li>
                </template>
            </ul>

            <div class="d-flex justify-space-between align-center mt-4">
                <v-btn
                    elevation="1"
                    rounded
                    dark
                    color="#F22539"
                    large
                >
                    Share to my friends
                </v-btn>
                <btn-fav @set_favorite="set_favorite" :favorite="favorite" />
            </div>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'modal',
    props: {
        open_modal: {
            type: Boolean,
            default: false,
        },
        
        pokemon: {
            type: Object,
            default: {},
        },

        data_favs: {
            type: Object,
            default: {}
        },
    },

    watch: {
        open_modal() {
            this.favorite = this.data_favs[this.pokemon.name];
            this.dialog = true;
        }
    },

    data: () => ({
        dialog: false,
        favorite: false,
    }),

    methods: {
        set_dialog(state) {
            this.dialog = state;
        },

        set_favorite() {
            let data = {
                pokemon: {
                    name: this.pokemon.name,
                    url: `${this.url_api}${this.pokemon.name}`,
                },
                action: !this.favorite
            }
            this.$store.dispatch('upd_favorites', data);
            this.favorite = !this.favorite;
            this.$emit('get_favs');
        },
    },

    computed: {
        img_pokemon() {
            if(this.pokemon.sprites) {
                return this.pokemon.sprites.front_default;
            }
            return '';
        },

        data_pokemon() {
            return {
                name: this.pokemon.name,
                weight: this.pokemon.weight,
                height: this.pokemon.height,
                types: this.types,
            }
        },

        types() {
            if(this.pokemon.types){
                let res = '';
                this.pokemon.types.forEach((type, key) => {
                    res += key 
                        ? `, ${type.type.name}` 
                        : type.type.name;
                });
                return res;
            }
            return '';
        },

        url_api() {
            return this.$store.getters.url_api;
        }
    }
}
</script>

<style scoped>
.bg-img {
    background: url('../assets/bg-pokemon.png');
}

.data {
    padding: 15px 30px;
}

ul li {
    color: #5E5E5E;
    font-size: 18px;
    border-bottom: 1px solid #E8E8E8;
}
</style>