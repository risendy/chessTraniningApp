<template>
    <div class="card card-body bg-light">
        <h5>History</h5>

        <p id="gameHistory" v-html="gameHistory" class="card-text">

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
                            resultHtml += "<b><p class='game-history-paragraph'>"+counter+'. '+gameHistory[i]+' </b>';
                            continue;
                        }

                        resultHtml += "<p class='game-history-paragraph'>"+counter+'. '+gameHistory[i]+' ';

                        counter++;
                    }
                    else
                    {
                        //last move
                        if (i == gameHistory.length-1) {
                            resultHtml += "<b>"+gameHistory[i]+"</b></p>";
                            continue;
                        }

                        resultHtml += gameHistory[i]+"</p>";
                    }
                }
            }

            return resultHtml;
        }
    },
});

export default gameHistoryComponent;
</script>