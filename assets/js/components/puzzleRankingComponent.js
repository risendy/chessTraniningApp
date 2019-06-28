import Vue from 'vue';
import globalObject from './../globals.js';

var puzzleRankingComponent = Vue.component('puzzle-ranking-component', {
    data: function () {
        return {
            puzzleRanking: ''
        }
    },
    template: globalObject.puzzleRanking,
    computed: {
        puzzleRankingValue() {
            return globalObject.puzzleRankingValue;
        }
    },
});

export default puzzleRankingComponent;
