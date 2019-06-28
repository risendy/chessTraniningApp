import Vue from 'vue';
import globalObject from './../globals.js';

var playerRankingComponent = Vue.component('player-ranking-component', {
    props: ['dataUserRanking'],
    data: function () {
        return {
            playerRating: globalObject.playerRanking
        }
    },
    template: globalObject.playerRanking,
    beforeMount: function() {
        //this.playerRankingValue = this.dataUserRanking;
        globalObject.playerRankingValue = this.dataUserRanking;
    },
    computed: {
        playerRankingValue() {
            return globalObject.playerRankingValue;
        }
    }
});

export default playerRankingComponent;
