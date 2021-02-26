<template>
    <span id="playerRankingDifference" v-html="playerRankingDifferenceValue"></span>
</template>

<script>
import Vue from 'vue';
import store from '../store/store.js';

var playerRankingDifferenceComponent = Vue.component('player-ranking-difference-component', {
    data: function () {
        return {

        }
    },
    computed: {
        playerRankingDifferenceValue() {
            return store.getters.playerRankingDifferenceValue;
        }
    },
});

export default playerRankingDifferenceComponent;
</script>
