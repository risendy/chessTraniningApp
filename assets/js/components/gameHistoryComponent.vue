<template>
    <div class="card card-body bg-light">
        <h5>History</h5>

        <p id="gameHistory" v-html="gameHistory" class="card-text">

        </p>
        <p>
<!--            <input type="button" id="startPositionBtn5" value="|<" v-on:click="resetPosition"/>-->
            <input type="button" id="prevBtn5" value="<" v-on:click="prevMove"/>
            <input type="button" id="nextBtn5" value=">" v-on:click="nextMove"/>
<!--            <input type="button" id="endPositionBtn5" value=">|" />-->
        </p>
    </div>
</template>

<script>
import Vue from 'vue';
import store from './../globals.js';

var gameHistoryComponent = Vue.component('game-history-component', {
    data: function () {
        return {

        }
    },
    methods: {
        prevMove: function () {
            store.board.position(store.game.back());
        },
        nextMove: function () {
            store.board.position(store.game.next());
        },
    },
    computed: {
        gameHistory() {
            let gameHistory =  store.gameHistory;
            let resultHtml = '';
            let counter = 1;

            if (gameHistory === '') {
                return  'no data';
            }

            if (gameHistory) {
                for (let i=0; i<gameHistory.length; i++) {
                    if (i % 2 == 0) {
                        //last move
                        if (i == gameHistory.length-1) {
                            resultHtml += "<p class='game-history-paragraph'>"+counter+'. '+gameHistory[i];
                            continue;
                        }

                        resultHtml += "<p class='game-history-paragraph'>"+counter+'. '+gameHistory[i]+' ';

                        counter++;
                    }
                    else
                    {
                        //last move
                        if (i == gameHistory.length-1) {
                            resultHtml += gameHistory[i]+"</p>";
                            continue;
                        }

                        resultHtml += gameHistory[i]+"</p>";
                    }
                }
            }

            return resultHtml;
        },
        history() {
            return store.game.history();
        },

    },
    mounted() {

    }
});

export default gameHistoryComponent;
</script>