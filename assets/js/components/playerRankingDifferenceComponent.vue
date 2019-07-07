<template>
    <span id="playerRankingDifference" v-html="playerRankingDifferenceValue"></span>
</template>

<script>
import Vue from 'vue';
import store from './../globals.js';

var playerRankingDifferenceComponent = Vue.component('player-ranking-difference-component', {
    data: function () {
        return {

        }
    },
    computed: {
        playerRankingDifferenceValue() {
            return store.playerRankingDifferenceValue;
        }
    },
});

export default playerRankingDifferenceComponent;
</script>