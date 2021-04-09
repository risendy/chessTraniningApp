import Vue from 'vue';
import store from './store/store.js';
import progressInformationComponent from './components/progressInformationComponent.vue';
import puzzleRankingComponent from './components/puzzleRankingComponent.vue';
import playerRankingDifference from './components/playerRankingDifferenceComponent.vue';
import puzzleRankingDifferenceComponent from './components/puzzleRankingDifferenceComponent.vue';
import playerRankingComponent from './components/playerRankingComponent.vue';
import PuzzleInformationComponent from './components/puzzleInformationComponent.vue';
import statusComponent from './components/statusComponent.vue';
import * as Func from './modules/functions.js';
import startStreakComponent from "./components/startStreakComponent";
import countStreakComponent from "./components/countStreakComponent";
import DemoSizeModal from './components/endOfStreakModal.vue'
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
