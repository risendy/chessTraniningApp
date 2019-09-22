<template>
    <p id="gameHistory" v-html="gameHistory" class="card-text">

    </p>
</template>

<script>
import Vue from 'vue';
import store from './../globals.js';

var gameHistoryComponent = Vue.component('game-history-component', {
    data: function () {
        return {

        }
    },
    computed: {
        gameHistory() {
            return store.gameHistory;
        }
    },
});

export default gameHistoryComponent;
</script>