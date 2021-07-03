<template>
<v-btn
    class="mx-2"
    fab
    small
    color="F5F5F5"
    elevation="0"
    @click.stop="set_favorite"
>
    <v-icon :color="favorite ? '#ECA539' : '#BFBFBF'">
        mdi-star
    </v-icon>
</v-btn>
</template>

<script>
export default {
    name: 'btnfav',
    props: ['favorite'],

    methods: {
        set_favorite() {
            this.$emit('set_favorite');
        }
    }
}
</script>

<style scoped>

</style>