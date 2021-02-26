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
import store from '../store/store.js';

var gameHistoryComponent = Vue.component('game-history-component', {
    data: function () {
        return {

        }
    },
    methods: {
        prevMove: function () {
            store.getters.board.position(store.getters.game.back());

            store.state.currentMove -= 1;
            if (store.getters.currentMove < 0) {
                store.state.currentMove = 0;
            }
        },
        nextMove: function () {
            store.getters.board.position(store.getters.game.next());
            store.state.currentMove += 1;

            if (store.getters.currentMove > store.getters.gameHistory.length) {
                store.getters.currentMove = store.getters.gameHistory.length;
            }
        },
    },
    computed: {
        gameHistory() {
            let gameHistory =  store.getters.gameHistory;
            let resultHtml = '';
            let counter = 1;

            if (gameHistory === '') {
                return  'no data';
            }

            if (gameHistory) {
                for (let i=0; i<gameHistory.length; i++) {
                    if (i % 2 == 0) {

                        if (i == store.getters.currentMove-1){
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
                        if (i == store.getters.currentMove-1){
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
