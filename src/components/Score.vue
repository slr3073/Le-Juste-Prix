<template>
    <div :class="cardClass">
        <div class="card-header">
            Partie n°{{ party.id }} {{ party.isWin ? " : Gagné " : " : Perdu " }}
        </div>
        <div class="card-body">
            <h5 class="card-title text-muted" v-if="party.isWin">C'est une victoire, bien joué !</h5>
            <h5 class="card-title text-muted" v-else>C'est une défaite, vous ferez mieux la prochaine fois !</h5>
            <h6>Vous avez fait <strong>{{ party.nbAttempts }}</strong>  tentative{{ party.nbAttempts > 1 ? "s" : "" }}
                en <strong>{{ this.minutes }}</strong>  m et <strong>{{ this.secondes }}</strong>  s
            </h6>

        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Score",
    computed: {
        ...mapGetters(['getPartyByID']),
        party() {
            return this.getPartyByID(this.$route.params.id)
        },
        cardClass() {
            return this.party.isWin ? "card border-success" : "card border-danger"
        },
        minutes() {
            return Math.floor(this.party.time / 60)
        },
        secondes() {
            return Math.floor(this.party.time % 60)
        }
    }
}
</script>

<style scoped>

</style>
