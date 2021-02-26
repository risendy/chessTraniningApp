import Vue from 'vue';
import store from './store/store.js';
import axios from 'axios';
import progressInformationComponent from './components/progressInformationComponent.vue';
import puzzleRankingComponent from './components/puzzleRankingComponent.vue';
import playerRankingDifference from './components/playerRankingDifferenceComponent.vue';
import puzzleRankingDifferenceComponent from './components/puzzleRankingDifferenceComponent.vue';
import showSolutionComponent from './components/showSolutionComponent.vue';
import playerRankingComponent from './components/playerRankingComponent.vue';
import PuzzleInformationComponent from './components/puzzleInformationComponent.vue';
import statusComponent from './components/statusComponent.vue';
import LineChartContainerMini from './components/ChartContainerMini.vue'
import NextPosition from './components/nextPosition.vue'
import GameHistory from './components/gameHistoryComponent.vue'
import * as ajaxFunc from './modules/ajaxCalls.js';
import * as Func from './modules/functions.js';

export let appMainComponent;

appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        statusValue: 0,
        ratingsDifference: []
    },
    components: {
        'progress-information-component': progressInformationComponent,
        'puzzle-information-component': PuzzleInformationComponent,
        'puzzle-ranking-component': puzzleRankingComponent,
        'player-ranking-difference-component': playerRankingDifference,
        'puzzle-ranking-difference-component': puzzleRankingDifferenceComponent,
        'show-solution-component': showSolutionComponent,
        'player-ranking-component': playerRankingComponent,
        'status-component': statusComponent,
        'line-chart-container': LineChartContainerMini,
        'next-position': NextPosition,
        'game-history-component': GameHistory
    },
    methods: {
      getposition: function () {
          store.dispatch('resetPuzzleAndGameValues');

          ajaxFunc.getRandomPosition();
      },
      showsolution: function() {
          Func.showSolutionFunc();
      },
      forceRerenderHistory: function () {
            axios.get(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:5} ))
                .then(response => {
                    this.ratingsDifference = response.data.difference;
                })
                .catch(error => console.log(error));
        },

    },
    created: function () {
        axios.get(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:5} ))
            .then(response => {
                this.ratingsDifference = response.data.difference;
            })
            .catch(error => console.log(error));
    }

});

var cfg = {
    draggable: true,
    orientation: 'white',
    position: 'start',
    onDragStart: Func.onDragStart,
    onDrop: Func.onDrop,
    onSnapEnd: Func.onSnapEnd
};

store.state.cfg = cfg;
store.commit('initBoard', cfg);
store.commit('initGame');

Func.updateStatus();

