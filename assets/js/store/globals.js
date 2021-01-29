import Chess from "../lib/chess";
import Vue from 'vue';

var userId = $("#userId").val();

var store = new Vue({
    data: {
        game: null,
        board: null,
        cfg: null,
        solution: null,
        solutionCopy: null,
        currentPosition: null,
        playerRankingValue: null,
        puzzleRankingValue: null,
        puzzleActive: false,
        userId,
        progressInformationValue: '',
        playerRankingDifferenceValue: '',
        puzzleRankingDifferenceValue: '',
        showSolutionFlag: false,
        statusValue: null,
        puzzleInformation: '',
        puzzleInformationTotalTries: '',
        puzzleSuccessRate: '',
        gameHistory: '',
        currentMove: '',
    },
    computed: {

    },
    methods: {
        setProgressInformationAction (newValue) {
            this.progressInformation = newValue
        },
        initBoard (cfg) {
            this.board = ChessBoard('board', cfg);
        },
        initGame () {
            this.game = new Chess();
        },
    }
});

export default store;