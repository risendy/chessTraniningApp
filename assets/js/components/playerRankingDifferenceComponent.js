import Vue from 'vue';
import globalObject from './../globals.js';

var playerRankingDifferenceComponent = Vue.component('player-ranking-difference-component', {
    data: function () {
        return {
            playerRankingDifference: globalObject.playerRankingDifference
        }
    },
    computed: {
        playerRankingDifferenceValue() {
            return globalObject.playerRankingDifferenceValue;
        }
    },
    template: globalObject.playerRankingDifference
});

export default playerRankingDifferenceComponent;
