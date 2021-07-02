<template>
<div class="container-loader d-flex justify-center align-center">
        <v-img
            max-height="106"
            max-width="106"
            src="../assets/loader.png"
            class="img"
        ></v-img>
</div>
</template>

<script>
export default {
    name: 'loader',

    data: () => ({

    }),
}
</script>

<style scoped>
.container-loader {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: white;
}

.img {
    border-radius: 50%;
    background: rgba(242, 37, 57, 0);
    animation: loading 2s infinite;
}

@keyframes loading {
    0% { transform: translate(0, 0) rotate(0); background: rgba(242, 37, 57, 0); }
    25% { transform: translate(-8px, 0) rotate(-18deg); background: rgba(242, 37, 57, .60); }
    33% { transform: translate(8px, 0) rotate(18deg); background: rgba(242, 37, 57, .90); }
    50% { transform: translate(-8px, 0) rotate(-12deg); background: rgba(242, 37, 57, 1); }
    60% { transform: translate(8px, 0) rotate(18deg); background: rgba(242, 37, 57, .80); }
    100% { transform: translate(0, 0) rotate(0); background: rgba(242, 37, 57, 0); }
}
</style>