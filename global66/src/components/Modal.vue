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

            <v-btn
                icon
                color="white"
                class="icon-close"
                @click="set_dialog(false)"
            >
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
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
                    @click="copy"
                >
                    Share to my friends
                </v-btn>
                <btn-fav @set_favorite="set_favorite" :favorite="favorite" />
            </div>
            <span id="text-copy">{{text_copy}}</span>
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

        copy() {
            let span = document.getElementById('text-copy');
            let selection = document.createRange();
            selection.selectNodeContents(span);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(selection);
            document.execCommand('copy');
            window.getSelection().removeRange(selection);
        },

        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
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

        text_copy() {
            let keys = Object.keys(this.data_pokemon);
            let values = Object.values(this.data_pokemon);
            let res = '';
            values.forEach((data, key) => {
                res += `${this.capitalize(keys[key])}: ${this.capitalize(data)}`; 
                if(key < values.length - 1)
                    res += ', ';
            });

            return res;

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
    position: relative;
}

.icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.data {
    padding: 15px 30px;
}

ul li {
    color: #5E5E5E;
    font-size: 18px;
    border-bottom: 1px solid #E8E8E8;
}

#text-copy {
    font-size: 0;
    position: absolute;
    top: -1000px;
    left: -1000px;
}
</style>