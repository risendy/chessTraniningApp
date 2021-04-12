import Vue from 'vue';
import store from './store/store.js';
import progressInformationComponent from './components/single-puzzle/progressInformationComponent.vue';
import puzzleRankingComponent from './components/single-puzzle/puzzleRankingComponent.vue';
import playerRankingDifference from './components/single-puzzle/playerRankingDifferenceComponent.vue';
import puzzleRankingDifferenceComponent from './components/single-puzzle/puzzleRankingDifferenceComponent.vue';
import playerRankingComponent from './components/single-puzzle/playerRankingComponent.vue';
import PuzzleInformationComponent from './components/single-puzzle/puzzleInformationComponent.vue';
import statusComponent from './components/single-puzzle/statusComponent.vue';
import * as Func from './modules/functions.js';
import startStreakComponent from "./components/puzzle-streak/startStreakComponent";
import countStreakComponent from "./components/puzzle-streak/countStreakComponent";
import DemoSizeModal from './components/puzzle-streak/endOfStreakModal.vue'
import 'regenerator-runtime/runtime';
import VModal from 'vue-js-modal'
Vue.use(VModal)

export let appMainComponent;

appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        statusValue: 0,
    },
    components: {
        'demo-size-modal': DemoSizeModal,
        'start-streak-component': startStreakComponent,
        'count-streak-component': countStreakComponent,
        'progress-information-component': progressInformationComponent,
        'puzzle-information-component': PuzzleInformationComponent,
        'puzzle-ranking-component': puzzleRankingComponent,
        'player-ranking-difference-component': playerRankingDifference,
        'puzzle-ranking-difference-component': puzzleRankingDifferenceComponent,
        'player-ranking-component': playerRankingComponent,
        'status-component': statusComponent,
    },
    methods: {

    },
    computed: {
        modal () {
            return store.state.showEndStreakDialog;
        },
        puzzleRanking() {
            return store.getters.puzzleRankingValue;
        }
    },
    watch: {
        modal (newFlag, oldCount) {
            if (newFlag) {
                this.$modal.show('conditional-modal', {
                    show: true
                })
            }
        }
    },
    created: function () {
        store.commit('setGameMode', 1);
    },
    mounted: function () {

    }
});

var cfg = {
    draggable: false,
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
