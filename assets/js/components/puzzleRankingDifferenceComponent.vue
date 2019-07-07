<template>
    <span id="puzzleRankingDifference" v-html="puzzleRankingDifferenceValue"></span>
</template>

<script>
import Vue from 'vue';
import store from './../globals.js';

var puzzleRankingDifferenceComponent = Vue.component('puzzle-ranking-difference-component', {
    data: function () {
        return {

        }
    },
    computed: {
        puzzleRankingDifferenceValue() {
            return store.puzzleRankingDifferenceValue;
        }
    },
});

export default puzzleRankingDifferenceComponent;
</script>