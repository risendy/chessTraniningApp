import Chess from "../lib/chess";
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

var userId = $("#userId").val();

const store = new Vuex.Store({
    state: {
        game: null,
        board: null,
        cfg: null,
        solution: null,
        solutionCopy: null,
        currentPosition: null,
        playerRankingValue: null,
        puzzleRankingValue: null,
        puzzleActive: false,
        puzzleId: '',
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
    getters: {
        game: state => state.game,
        board: state => state.board,
        cfg: state => state.cfg,
        solution: state => state.solution,
        solutionCopy: state => state.solutionCopy,
        currentPosition: state => state.currentPosition,
        playerRankingValue: state => state.playerRankingValue,
        puzzleRankingValue: state => state.puzzleRankingValue,
        puzzleActive: state => state.puzzleActive,
        puzzleId: state => state.puzzleId,
        progressInformationValue: state => state.progressInformationValue,
        playerRankingDifferenceValue: state => state.playerRankingDifferenceValue,
        puzzleRankingDifferenceValue: state => state.puzzleRankingDifferenceValue,
        showSolutionFlag: state => state.showSolutionFlag,
        statusValue: state => state.statusValue,
        puzzleInformation: state => state.puzzleInformation,
        puzzleInformationTotalTries: state => state.puzzleInformationTotalTries,
        puzzleSuccessRate: state => state.puzzleSuccessRate,
        gameHistory: state => state.gameHistory,
        currentMove: state => state.currentMove,
        userId: state => state.userId,
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setProgressInformationAction (state, newValue) {
            state.progressInformation = newValue
        },
        initBoard (state, cfg) {
            state.board = ChessBoard('board', cfg);
        },
        initGame (state) {
            state.game = new Chess();
        },
        changeCfgPosition (state, fen) {
            state.cfg.position = fen;
        },
        changeCfgDraggable (state, draggable) {
            state.cfg.draggable = draggable;
        },
        changeSolution (state, solution) {
            state.solution = solution;
        },
        changeSolutionCopy (state, solution) {
            state.solutionCopy = solution;
        },
        changePuzzleRankingValue (state, puzzleRanking) {
            state.puzzleRankingValue = puzzleRanking;
        },
        changePuzzleActive (state, puzzleActive) {
            state.puzzleActive = puzzleActive;
        },
        changePuzzleId (state, puzzleId) {
            state.puzzleId = puzzleId;
        },
        changePuzzleInformationTotalTries (state, totalTries) {
            state.puzzleInformationTotalTries = totalTries;
        },
        changePuzzleSuccessRate (state, successRate) {
            state.puzzleSuccessRate = successRate;
        },
        changePlayerRankingDifferenceValue (state, playerRankingDifferenceValue) {
            state.playerRankingDifferenceValue = playerRankingDifferenceValue;
        },
        changePlayerRankingValue (state, playerRankingValue) {
            state.playerRankingValue = playerRankingValue;
        },
    },
    actions: {
        changeCfgPosition (state, fen) {
            state.commit('changeCfgPosition', fen);
        },
        changeCfg (state, payload) {
            state.commit('changeCfgPosition', payload.fen);
            state.commit('changeCfgDraggable', payload.draggable);
        },
        setNewPositionData(state, payload) {
            state.commit('changeSolution', payload.solution);
            state.commit('changeSolutionCopy', payload.solutionCopy);
            state.commit('changePuzzleRankingValue', payload.puzzleRankingValue);
            state.commit('changePuzzleActive', payload.puzzleActive);
            state.commit('changePuzzleId', payload.puzzleId);
            state.commit('changePuzzleInformationTotalTries', payload.puzzleInformationTotalTries);
            state.commit('changePuzzleSuccessRate', payload.puzzleSuccessRate);
        },
        setPlayerRatingInformation(state, payload) {
            state.commit('changePlayerRankingDifferenceValue', payload.playerRankingDifferenceValue)
            state.commit('changePlayerRankingValue', payload.playerRankingValue)
        }
    }
})

export default store;
