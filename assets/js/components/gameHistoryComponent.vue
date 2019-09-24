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

            store.currentMove -= 1;
            if (store.currentMove < 0) {
                store.currentMove = 0;
            }
        },
        nextMove: function () {
            store.board.position(store.game.next());
            store.currentMove += 1;

            if (store.currentMove > store.gameHistory.length) {
                store.currentMove = store.gameHistory.length;
            }
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

                        if (i == store.currentMove-1){
                            resultHtml += "<p class='game-history-paragraph'>"+counter+'.<b> '+gameHistory[i]+'</b> ';
                        }
                        else
                        {
                            resultHtml += "<p class='game-history-paragraph'>"+counter+'. '+gameHistory[i]+' ';
                        }

                        counter++;
                    }
                    else
                    {
                        if (i == store.currentMove-1){
                            resultHtml += '<b>'+gameHistory[i]+"</b></p>";
                        }
                        else
                        {
                            resultHtml += gameHistory[i]+"</p>";
                        }
                    }
                }
            }

            return resultHtml;
        },
    },
    mounted() {

    }
});

export default gameHistoryComponent;
</script>