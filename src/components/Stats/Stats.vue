<template>
    <div class="card">
        <div class="card-header">Statistiques</div>
        <div class="card-body">
            <div v-if="getHistory.length > 0">
                <p class="card-text">
                    Parties jouées : <strong class="text-primary">{{ getHistory.length }}</strong> <br>
                    Parties gagnées : <strong class="text-success">{{ nbWin }}</strong> <br>
                    Parties perdues : <strong class="text-danger">{{ getHistory.length - nbWin }}</strong> <br>
                    Taux de victoire :
                    <strong class="text-secondary">
                        {{ Math.round(nbWin / getHistory.length * 10000) / 100 }}%
                    </strong> <br>
                    Temps moyen : <strong class="text-secondary">{{ displayAverageTime }}</strong> <br>
                    Nombre de tentavice moyen : <strong class="text-secondary">{{ averageNbAttemps }}</strong> <br>
                </p>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Numéro</th>
                        <th scope="col">Tentatives</th>
                        <th scope="col">Temps</th>
                        <th scope="col">Résultat</th>
                    </tr>
                    </thead>
                    <tbody>
                    <partie-display v-for="p in getHistory" :key="p.id" :party="p"></partie-display>
                    </tbody>
                </table>
            </div>
            <h4 class="text-muted" v-else> Vous n'avez pas encore joué !</h4>
        </div>
    </div>
</template>

<script>
import PartieDisplay from "./PartieTr";
import {mapGetters} from "vuex";

export default {
    name: "Stats",
    components: {PartieDisplay},
    computed: {
        ...mapGetters(['getHistory']),
        nbWin() {
            let nb = 0
            for (const p of this.getHistory)
                if (p.isWin) nb += 1
            return nb
        },
        averageNbAttemps() {
            let totalAttempts = 0
            for (const p of this.getHistory)
                totalAttempts += p.nbAttempts
            return Math.round(totalAttempts / this.getHistory.length * 100) / 100
        },
        avarageTime() {
            let total = 0;
            for (const p of this.getHistory)
                total += p.time
            return Math.round(total / this.getHistory.length)
        },
        displayAverageTime() {
            let minutes = Math.floor(this.avarageTime / 60)
            let seconds = Math.floor(this.avarageTime % 60)
            return seconds < 10 ? minutes + ":0" + seconds : minutes + ":" + seconds
        }
    }
}
</script>
