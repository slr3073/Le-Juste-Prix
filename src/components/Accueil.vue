<template>
    <div class="card">
        <div class="card-header">
            Plus ou Moins ?
        </div>
        <div class="card-body">
            <h5 class="card-title text-muted">Devinez le plus vite et efficacement possible !</h5>
            <hr>
            <router-link class="btn btn-primary btn-lg" to="/play">
                <i class="bi bi-controller"></i>
                NOUVELLE PARTIE
            </router-link>
            <br>-<br>
            <router-link class="btn btn-success btn-lg" to="/stats">
                <i class="bi bi-graph-up-arrow"></i>
                STATISTIQUES
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Accueil"
}
</script>
