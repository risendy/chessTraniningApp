<template>
    <span id="puzzleRanking" v-html="puzzleRankingValue"></span>
</template>

<script>
import Vue from 'vue';
import store from '../../store/store.js';

var puzzleRankingComponent = Vue.component('puzzle-ranking-component', {
    data: function () {
        return {

        }
    },
    computed: {
        puzzleRankingValue() {
            return store.getters.puzzleRankingValue;
        }
    },
});

export default puzzleRankingComponent;
</script>
