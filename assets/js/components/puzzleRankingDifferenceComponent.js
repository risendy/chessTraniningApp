import Vue from 'vue';
import globalObject from './../globals.js';

var puzzleRankingDifferenceComponent = Vue.component('puzzle-ranking-difference-component', {
    data: function () {
        return {
            puzzleRankingDifference: globalObject.puzzleRankingDifference
        }
    },
    template: globalObject.puzzleRankingDifference,
    computed: {
        puzzleRankingDifferenceValue() {
            return globalObject.puzzleRankingDifferenceValue;
        }
    },
});

export default puzzleRankingDifferenceComponent;
