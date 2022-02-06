<template>
    <tr>
        <th>
            <router-link :class="btnClass" :to="/score/+ party.id">Partie n°{{party.id}}</router-link>
        </th>
        <td>{{ party.nbAttempts }}</td>
        <td>{{ displayTime }}</td>
        <td>
            <i class="fa fa-check text-success" v-if="party.isWin"></i>
            <i class="fa fa-times text-danger" v-else></i>
        </td>
    </tr>
</template>

<script>
export default {
    name: "PartieDisplay",
    props: {
        party: {
            type: Object,
            required: true
        }
    },
    computed: {
        minutes() { return Math.floor(this.party.time / 60) },
        secondes() {return Math.floor(this.party.time % 60)},
        displayTime() { return this.secondes < 10 ? this.minutes + ":0" + this.secondes : this.minutes + ":" + this.secondes},
        btnClass(){ return this.party.isWin ? "btn btn-success" :  "btn btn-danger"}
    }
}
</script>
