<template>
    <hr>
    <div :class="alertClass" role="alert">
        <span class=" close">{{ nbSameFeedbackInARow }}</span>
        <i :class="iconClass"></i>
        {{ cestPlusOuMoins }}
        <i :class="iconClass"></i>
    </div>
</template>

<script>
export default {
    name: "FeedbackAlert",
    props: {
        attemptCount: Number,
        plusOuMoins: Number,
        nbSameFeedbackInARow: Number
    },
    computed: {
        cestPlusOuMoins() {
            switch (this.plusOuMoins) {
                case 1:
                    return "C'est plus."
                case -1:
                    return "C'est moins."
                case 0:
                    return "C'est gagné !"
                default:
                    return "C'est cassé !?"
            }
        },
        alertClass() {
            if (this.plusOuMoins === 1)
                return "alert alert-warning"
            else
                return "alert alert-info"
        },
        iconClass() {
            if (this.plusOuMoins === 1)
                return "bi bi-file-plus"
            else
                return "bi bi-file-minus"
        }
    }
}
</script>
