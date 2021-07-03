<template>
<div class="pt-4 container-welcome">
    <div class="imgs mx-auto mb-4">
        <v-img
            height="206"
            width="206"
            src="../assets/ellipse.png"
            class="po-abs"
        ></v-img>
        <v-img
            height="288"
            width="325"
            src="../assets/pikachu.png"
            class="po-abs"
        ></v-img>
    </div>

    <div class="text-center px-5">
        <h1>Welcome to Pokédex</h1>
        <p class="mt-5 mb-10">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>

        <v-btn
            elevation="1"
            rounded
            dark
            class="btn"
            color="#F22539"
            large
            @click="get_started"
        >
            Get started
        </v-btn>
    </div>

    <loader-c v-if="loading"/>
</div>
</template>

<script>
export default {
    name: 'welcome',

    data: () => ({
        loading: false,
    }),

    methods: {
        get_started() {
            this.loading = true;
            setTimeout(() => {
                this.$router.push('/pokemons')
            }, 2000)
        }
    }
}
</script>

<style scoped>
.container-welcome {
    max-width: 600px;
    margin: 0 auto;
}
.imgs {
    position: relative;
    height: 288px;
    width: 325px;
}

.po-abs {
    position: absolute;
}

.po-abs:first-of-type {
    top: 70px;
    left: 49px;
}

h1 {
    color: #353535;
    font-size: 26px;
}

p {
    color: #5E5E5E;
    font-size: 18px;
}
</style>