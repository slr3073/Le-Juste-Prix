<template>
    <ul class="nav nav-tabs justify-content-center nav-fill">
        <li class="nav-item">
            <router-link :class="getNavItemClass('/')" to="/">Accueil</router-link>
        </li>
        <li class="nav-item">
            <router-link :class="getNavItemClass('/play')" to="/play">Jouer une partie</router-link>
        </li>
        <li class="nav-item">
            <router-link :class="getNavItemClass('/stats')" to="/stats">Statistiques</router-link>
        </li>
        <li class="nav-item">
            <router-link :class="getNavItemClass('/credits')" to="/credits">Crédits</router-link>
        </li>
    </ul>
    <router-view/>
</template>

<script>

export default {
    name: 'App',
    methods: {
        getNavItemClass(path) {
            if (this.$route.fullPath === path) return "nav-link active"
            return "nav-link"
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    margin-bottom: 20px;
    margin-top: 10px;
}
</style>
