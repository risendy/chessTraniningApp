<template> 
    <span id="playerRanking" v-html="playerRankingValue"></span>
</template>

<script>
import Vue from 'vue';
import store from '../store/globals.js';

var playerRankingComponent = Vue.component('player-ranking-component', {
    props: ['dataUserRanking'],
    data: function () {
        return {

        }
    },
    beforeMount: function() {
        store.playerRankingValue = this.dataUserRanking;
    },
    computed: {
        playerRankingValue() {
            return store.playerRankingValue;
        }
    }
});

export default playerRankingComponent;
</script>