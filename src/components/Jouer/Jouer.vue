<template>
    <div class="card">
        <div class="card-header">
            Jouer
        </div>
        <div class="card-body">
            <h5 class="card-title text-muted">Trouvez le nombre entre 0 et 1000 !</h5>
            <h5 v-if="remainingTime">Il vous reste : </h5>
            <p v-if="remainingTime > 0">{{ this.minutes }} m et {{ this.secondes }} s</p>
            <form v-if="remainingTime > 0" class="form-inline devinerForm">
                <div class="form-group mx-sm-3 mb-2">
                    <input type="number" class="form-control" placeholder="Entrez un prix" v-model="attempt">
                </div>
                <button type="button" class="btn btn-secondary mb-2" @click="sendAttempt" :disabled="!isValidInput">
                    Deviner
                </button>
            </form>
            <feedback-alert v-if="attemptCount > 0" :attempt-count="attemptCount"
                            :plus-ou-moins="this.attemptResponse.data.code"
                            :nb-same-feedback-in-a-row="this.nbSameFeedbackInARow">
            </feedback-alert>
            <hr>
            <button type="button" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#exampleModalCenter">
                <i class="bi bi-x-circle"></i> ABANDONNER
            </button>
        </div>
    </div>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Voulez-vous vraiment abandonner ?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Votre partie sera comptée comme une défaite !
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-md" data-dismiss="modal">
                        <i class="bi bi-arrow-left"></i> &nbsp RETOUR
                    </button>
                    <router-link class="btn btn-danger btn-md" to="/" @click="ff" data-dismiss="modal">
                        <i class="bi bi-x-circle"></i> &nbsp ABANDONNER
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import axios from "axios";
import FeedbackAlert from "./FeedbackAlert";
const TOTAL_TIME = 90

export default {
    name: "Jouer",
    components: {FeedbackAlert},
    data() {
        return {
            remainingTime: TOTAL_TIME,
            userToken: null,
            attempt: "",
            attemptCount: 0,
            attemptResponse: {},
            nbSameFeedbackInARow: 0,
            lastFeedback: -2,
            isWon: false
        }
    },
    computed: {
        ...mapGetters(['getHistory']),
        minutes() {
            return Math.floor(this.remainingTime / 60)
        },
        secondes() {
            return Math.floor(this.remainingTime % 60)
        },
        isValidInput() {
            return !(this.attempt === "" || this.attempt < 0 || this.attempt > 1000);
        },
    },
    watch: {
        remainingTime: {
            handler(value) {
                if (value > 0)
                    setTimeout(() => {
                        this.remainingTime--
                        if (this.remainingTime === 0) this.lose()
                    }, 1000);
            },
            immediate: true
        }
    },
    methods: {
        async getToken() {
            try {
                this.userToken = await axios.get('https://vuejs-rest-challenge.herokuapp.com/token')
            } catch (e) {
                console.error(e)
            }
        },
        async sendAttempt() {
            try {
                this.attemptResponse = await axios.post('https://vuejs-rest-challenge.herokuapp.com/try', {
                    token: this.userToken.data.token,
                    guess: this.attempt
                })
                this.attemptCount++
                if (this.attemptResponse.data.code === 0) {
                    this.win()
                    return
                }

                if (this.lastFeedback === this.attemptResponse.data.code)
                    this.nbSameFeedbackInARow++
                else {
                    this.nbSameFeedbackInARow = 1
                    this.lastFeedback = this.attemptResponse.data.code
                }

            } catch (e) {
                console.error(e)
            }
        },
        lose() {
            this.addParty({
                id: this.getHistory.length,
                nbAttempts: this.attemptCount,
                time: TOTAL_TIME - this.remainingTime,
                isWin: false
            })
            this.$router.push("/score/" + (this.getHistory.length - 1))
        },
        ff() {
            this.remainingTime = 0
            this.lose()
        },
        win() {
            this.addParty({
                id: this.getHistory.length,
                nbAttempts: this.attemptCount,
                time: TOTAL_TIME - this.remainingTime,
                isWin: true
            })
            this.$router.push("/score/" + (this.getHistory.length - 1))
        },
        ...mapMutations(['addParty']),
    },
    beforeMount() {
        this.getToken()
    }
}
</script>
<style>
.devinerForm {
    margin-left: 35%;
}

</style>
