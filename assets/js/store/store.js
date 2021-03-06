import Chess from "../lib/chess";
import Vue from 'vue';
import Vuex from 'vuex'
import * as MyFn from "../modules/functions";

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
        puzzleTimeStart: '',
        puzzleTimeStop: '',
        ratingsDifference: [],
        puzzleResult: ''
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
        puzzleResult: state => state.puzzleResult,
        puzzleInformationTotalTries: state => state.puzzleInformationTotalTries,
        puzzleSuccessRate: state => state.puzzleSuccessRate,
        gameHistory: state => state.gameHistory,
        currentMove: state => state.currentMove,
        userId: state => state.userId,
        puzzleTimeStart: state => state.puzzleTimeStart,
        puzzleTimeStop: state => state.puzzleTimeStop,
        ratingsDifference: state => state.ratingsDifference,
        getPuzzleElapsedTime: state => {
            var timeDiff = state.puzzleTimeStop - state.puzzleTimeStart; //in ms
            // strip the ms
            timeDiff /= 1000;

            // get seconds
            return timeDiff;
        }
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
        changeCfg (state, cfg) {
            state.cfg = cfg;
        },
        changeCfgPosition (state, fen) {
            state.cfg.position = fen;
        },
        changeCfgDraggable (state, draggable) {
            state.cfg.draggable = draggable;
        },
        changeCfgOrientation (state, orientation) {
            state.cfg.orientation = orientation;
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
        changePuzzleRankingDifferenceValue (state, puzzleRankingDifferenceValue) {
            state.puzzleRankingDifferenceValue = puzzleRankingDifferenceValue;
        },
        changePlayerRankingValue (state, playerRankingValue) {
            state.playerRankingValue = playerRankingValue;
        },
        changeCurrentPosition (state, currentPosition) {
            state.currentPosition = currentPosition;
        },
        changeGameHistory (state, gameHistory) {
            state.gameHistory = gameHistory;
        },
        changeProgressInformationValue(state, progressInformationValue) {
            state.progressInformationValue = progressInformationValue;
        },
        changePuzzleInformation(state, puzzleInformation) {
            state.puzzleInformation = puzzleInformation;
        },
        startCountingTime(state) {
            state.puzzleTimeStart = new Date();
        },
        stopCountingTime(state) {
            state.puzzleTimeStop = new Date();
        },
        changeRatingsDifference(state, ratingDifference) {
            state.ratingsDifference = ratingDifference;
        },
        changePuzzleResult(state, puzzleResult) {
            state.puzzleResult = puzzleResult;
        },
        changeCurrentMove(state, currentMove) {
            state.currentMove = currentMove;
        },
    },
    actions: {
        savePuzzleInformation(state, payload) {
            state.commit('changePuzzleResult', payload.puzzleResult);
            state.commit('changePuzzleActive', payload.puzzleActive);
        },
        changeCfgPosition (state, fen) {
            state.commit('changeCfgPosition', fen);
        },
        changeCfg (state, payload) {
            state.commit('changeCfgPosition', payload.fen);
            state.commit('changeCfgDraggable', payload.draggable);
        },
        setNewPositionData(state, payload) {
            state.commit('changeCurrentPosition', payload.currentPosition);
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
        },
        resetValuesInTemplateAfterChangingPosition(state) {
            state.commit('changePlayerRankingDifferenceValue', null)
            state.commit('changePuzzleRankingDifferenceValue', null)
        },
        updateGameHistory(state) {
            let gameHistory = state.getters.game.history();

            state.commit('changeGameHistory', gameHistory);
        },
        resetPuzzleAndGameValues(state) {
            state.commit('changeProgressInformationValue', '');
            state.commit('changePuzzleInformation', '');
            state.commit('changeGameHistory', '');
        },
        startCountingTime(state) {
            state.commit('startCountingTime');
        },
        stopCountingTime(state) {
            state.commit('stopCountingTime');
        },
        setRatingDifferenceArray(state, ratingDifference) {
            state.commit('changeRatingsDifference', ratingDifference);
        },
        setPuzzleCompleted(state) {
            var html = '<i class="fas fa-check" style="color:green"></i> Puzzle completed :)';

            state.commit('changeProgressInformationValue', html);
        },
        initNewPosition(state, payload) {
            state.getters.game.load(payload.fen);

            state.dispatch('changeCfg', {fen: payload.fen, draggable:true});
            state.commit('changeCurrentMove', state.getters.game.history().length);
            state.commit('changeGameHistory', state.getters.game.history());

            let solutionTmp = JSON.parse(payload.solution);
            solutionTmp.reverse();

            state.commit('changeSolution', solutionTmp);

            let color = payload.color;
            (color == 'B')? color = 'black' : color = 'white';

            state.commit('changeCfgOrientation', color);
            state.commit('initBoard', store.getters.cfg);
        },
        makeFirstMove(state) {
            var nextMove = MyFn.getNextMoveFromSolution(state.getters.solution);
            var movesNextMove = nextMove.split("-");
            var move = MyFn.makeMove(movesNextMove[0], movesNextMove[1]);
            var newFen = state.getters.game.fen();

            setTimeout(function(){
                state.dispatch('changeCfg', {fen: newFen, draggable: true});
                MyFn.updateStatus();
            }, 2000);
        }

    }
})

export default store;
