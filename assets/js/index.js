import Vue from 'vue';
import store from './store/store.js';
import progressInformationComponent from './components/single-puzzle/progressInformationComponent.vue';
import puzzleRankingComponent from './components/single-puzzle/puzzleRankingComponent.vue';
import playerRankingDifference from './components/single-puzzle/playerRankingDifferenceComponent.vue';
import puzzleRankingDifferenceComponent from './components/single-puzzle/puzzleRankingDifferenceComponent.vue';
import playerRankingComponent from './components/single-puzzle/playerRankingComponent.vue';
import PuzzleInformationComponent from './components/single-puzzle/puzzleInformationComponent.vue';
import puzzleRightSideInfoComponent from "./components/single-puzzle/puzzleRightSideInfoComponent";
import statusComponent from './components/single-puzzle/statusComponent.vue';
import LineChartContainerMini from './components/single-puzzle/chart/ChartContainerMini.vue'
import NextPosition from './components/single-puzzle/nextPosition.vue'
import GameHistory from './components/single-puzzle/gameHistoryComponent.vue'
import * as ajaxFunc from './modules/ajaxCalls.js';
import * as Func from './modules/functions.js';

export let appMainComponent;

appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        statusValue: 0,
    },
    components: {
        'progress-information-component': progressInformationComponent,
        'puzzle-information-component': PuzzleInformationComponent,
        'puzzle-right-info-component': puzzleRightSideInfoComponent,
        'puzzle-ranking-component': puzzleRankingComponent,
        'player-ranking-difference-component': playerRankingDifference,
        'puzzle-ranking-difference-component': puzzleRankingDifferenceComponent,
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
    },
    computed: {
        ratingsDifference() {
            return store.getters.ratingsDifference;
        }
    },
    created: function () {
        ajaxFunc.getPuzzleHistoryUser();
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

store.commit('changeCfg', cfg)
store.commit('initBoard', cfg);
store.commit('initGame');
store.dispatch('setBoardToSelectedTheme');

Func.updateStatus();

