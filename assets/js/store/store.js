import Chess from "../lib/chess";
import Vue from 'vue';
import Vuex from 'vuex'
import * as MyFn from "../modules/functions";
import * as apiCalls from "../modules/ajaxCalls";

Vue.use(Vuex)

var userId = $("#userId").val();

const store = new Vuex.Store({
    state: {
        gameMode: 0,
        game: null,
        board: null,
        cfg: null,
        solution: null,
        solutionCopy: null,
        currentPosition: null,
        playerRankingValue: null,
        puzzleRankingValue: null,
        puzzleActive: false,
        puzzleDifficulty: 'medium',
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
        puzzleResult: '',
        selectedThemes: {},
        puzzleThemes: [],
        lastMoveSquareTo: '',
        rerenderGraph: false,
        selectedBoardTheme: 1,
        puzzleSet: {},
        puzzleSolvedSet: [],
        isStartButtonStreakVisible: true,
        showEndStreakDialog: false,
        finalStreakScore: 0,
        highestSolvedPuzzleRanking: 0,
        highScoreUserAllTime: 0,
        timerStreak: 0,
        timerEnabled: false,
        badPuzzleCounter: 0
    },
    getters: {
        game: state => state.game,
        gameMode: state => state.gameMode,
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
        puzzleDifficulty: state => state.puzzleDifficulty,
        selectedThemes: state => state.selectedThemes,
        puzzleThemes: state => state.puzzleThemes,
        lastMoveSquareTo: state => state.lastMoveSquareTo,
        selectedBoardTheme: state => state.selectedBoardTheme,
        puzzleSet: state => state.puzzleSet,
        puzzleSetSolved: state => {
            return state.puzzleSolvedSet;
        },
        puzzleSetSolvedLength: state => {
            let puzzleSet = state.puzzleSolvedSet;

            return puzzleSet.filter((x) => x.solved == 1).length;
        },
        startButtonStreak: state => state.isStartButtonStreakVisible,
        showEndStreakDialog: state => state.showEndStreakDialog,
        finalStreakScore: state => state.finalStreakScore,
        highestSolvedPuzzleRanking: state => state.highestSolvedPuzzleRanking,
        timerStreak: state => state.timerStreak,
        timerEnabled: state => state.timerEnabled,
        badPuzzleCounter: state => state.badPuzzleCounter,
        highScoreUserAllTime: state => state.highScoreUserAllTime,
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
        setPuzzleSet (state, set) {
            state.puzzleSet = set
        },
        setGameMode (state, mode) {
            state.gameMode = mode
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
        incrementCurrentMove(state) {
          state.currentMove++;
        },
        changePuzzleDifficulty (state, puzzleDifficulty) {
            state.puzzleDifficulty = puzzleDifficulty;
        },
        changeSelectedThemes(state, selectedThemes) {
            state.selectedThemes = selectedThemes;
        },
        changePuzzleThemes(state, themes) {
            state.puzzleThemes = themes;
        },
        changeBoardTheme(state, theme) {
            state.selectedBoardTheme = theme;
        },
        setBoardColors (state, theme) {
            document.querySelectorAll('.white-1e1d7').forEach((el) => {
                el.classList.add('theme'+theme+'-white');
            });
            document.querySelectorAll('.black-3c85d').forEach((el) => {
                el.classList.add('theme'+theme+'-black');
            });
        },
        removeOldTheme(state) {
            document.querySelectorAll('.white-1e1d7').forEach((el) => {
                el.classList.remove('theme'+state.selectedBoardTheme+'-white');
            });
            document.querySelectorAll('.black-3c85d').forEach((el) => {
                el.classList.remove('theme'+state.selectedBoardTheme+'-black');
            });
        },
        addPositionToSolved(state, position) {
            state.puzzleSolvedSet.push(position);
        },
        changeLastSolvedPuzzleState(state, solvedStatus) {
            let arr = [...state.puzzleSolvedSet];

            arr[arr.length - 1].solved = solvedStatus;
            state.puzzleSolvedSet = arr;
        },
        isStartButtonStreakVisible(state, visibility) {
            state.isStartButtonStreakVisible = visibility;
        },
        clearSolvedPuzzles(state) {
            state.puzzleSolvedSet = [];
        },
        showEndStreakModal(state) {
            state.showEndStreakDialog = true;
        },
        hideEndStreakModal(state) {
            state.showEndStreakDialog = false;
        },
        incrementPuzzleStreakScore(state) {
            state.finalStreakScore = state.finalStreakScore + 1;
        },
        clearFinalScore(state) {
            state.finalStreakScore = 0;
        },
        setHighestSolvedPuzzle(state, puzzleRanking) {
            state.highestSolvedPuzzleRanking = puzzleRanking;
        },
        decrementTimerStreak(state) {
            state.timerStreak--;
        },
        setTimerStreak(state, value) {
            state.timerStreak = value;
        },
        setEnableTimer(state, value) {
            state.timerEnabled = value;
        },
        incrementBadPuzzleCounter(state) {
            state.badPuzzleCounter++;
        },
        resetBadPuzzleCounter(state) {
            state.badPuzzleCounter = 0;
        },
        setHighScoreUserAllTime(state, highscore) {
            state.highScoreUserAllTime = highscore;
        },
    },
    actions: {
        changeBoardColor(state, theme) {
            state.commit('removeOldTheme');
            state.commit('changeBoardTheme', theme.name);

            state.commit('setBoardColors', theme.name);
        },
        setBoardToSelectedTheme(state) {
            state.commit('setBoardColors', state.getters.selectedBoardTheme);
        },
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
            state.commit('changePuzzleThemes', payload.puzzleThemes);
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
            let html = `<div class="alert alert-success" role="alert">
                            <i class="fas fa-check" style="color:green"></i> Puzzle completed
                        </div>`;

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

            state.dispatch('setBoardToSelectedTheme');
        },
        makeFirstMove(state) {
            var nextMove = MyFn.getNextMoveFromSolution(state.getters.solution);
            var movesNextMove = nextMove.split("-");

            var move = state.dispatch('makeMove', {
                from: movesNextMove[0],
                to: movesNextMove[1]
            });

            var newFen = state.getters.game.fen();

            setTimeout(function(){
                state.dispatch('changeCfg', {fen: newFen, draggable: true});
                MyFn.updateStatus();
            }, 1000);
        },
        makeMove(state, payload) {
            return new Promise((resolve, reject) => {
                var move = state.getters.game.move({
                    from: payload.from,
                    to: payload.to,
                    promotion: 'q' // NOTE: always promote to a queen for example simplicity
                });

                state.dispatch('updateGameHistory');
                state.commit('incrementCurrentMove');

                resolve();

                return move;
            })
        },
        displayPuzzleInformation(state) {
            var puzzleRating = state.getters.puzzleRankingValue;
            var puzzleTotalTimesTried = state.getters.puzzleInformationTotalTries;
            var puzzleSuccessRate = state.getters.puzzleSuccessRate;
            var timeElapsed = state.getters.getPuzzleElapsedTime;

            const html = `
            <i class="fas fa-info-circle" style="color:green"></i> Puzzle information: 
            <p class="puzzle-info-paragraph"> Success rate: ${puzzleSuccessRate}%</p>
            <p class="puzzle-info-paragraph"> Time spent: ${timeElapsed} [s]</p>
            `;

            state.puzzleInformation = html;
        },
        setProgressInfo(state, type) {
            var html;

            if (type)
            {
                html = `<div class="alert alert-success" role="alert">
                            <i class="fas fa-check" style="color:green"></i> Good move
                        </div>`;

                MyFn.appendGoodMoveIconToSquare(state.getters.lastMoveSquareTo);
                MyFn.appendGoodMoveClassSquare(state.getters.lastMoveSquareTo);
            }
            else
            {
                html = `<div class="alert alert-danger" role="alert">
                            <i class="fas fa-times" style="color:red"></i> Bad move
                        </div>`;

                MyFn.appendBadMoveIconToSquare(state.getters.lastMoveSquareTo);
                MyFn.appendBadMoveClassSquare(state.getters.lastMoveSquareTo);
            }

            state.commit('changeProgressInformationValue', html);
        },
        changePlayerRatingInTemplate(state, newRating) {
            var playerRating = state.getters.playerRankingValue;
            var difference = MyFn.calculateRankingDifference(playerRating, newRating);

            if (newRating > playerRating)
            {
                var icon = '<i class="fas fa-plus" style="color:green;"></i>';
            }
            else
            {
                var icon = '<i class="fas fa-minus" style="color:red;"></i>';
            }

            state.commit('changePlayerRankingDifferenceValue', '('+ icon + difference + ')')
            state.commit('changePlayerRankingValue', newRating)
        },
        changePuzzleRankingInTemplate(state, newPuzzleRanking) {
            var difference = MyFn.calculateRankingDifference(state.getters.puzzleRankingValue, newPuzzleRanking);
            var icon;

            if (newPuzzleRanking > state.getters.puzzleRankingValue)
            {
                icon = '<i class="fas fa-plus" style="color:green;"></i>';
            }
            else
            {
                icon = '<i class="fas fa-minus" style="color:red;"></i>';
            }

            state.commit('changePuzzleRankingValue', newPuzzleRanking);
            state.commit('changePuzzleRankingDifferenceValue', '('+icon+difference+')');
        },
        loadNextPuzzleFromSet(state) {
            let arr = [...state.getters.puzzleSet];
            let position = arr.pop();
            position.solved = 0;

            state.commit('isStartButtonStreakVisible', false);
            state.commit('setPuzzleSet', arr);
            state.commit('addPositionToSolved', position);

            state.dispatch('initNewPosition',{
                fen: position.fen,
                solution: position.solution,
                color: position.color
            });

            state.dispatch('setNewPositionData', {
                currentPosition: position.fen,
                solution: state.getters.solution,
                solutionCopy:  [...state.getters.solution],
                puzzleRankingValue: parseFloat(position.puzzleRanking).toFixed(2),
                puzzleActive: true,
                puzzleId: position.puzzleId,
                puzzleInformationTotalTries: position.puzzleTotalTries,
                puzzleSuccessRate: position.puzzleSuccessRate,
                puzzleThemes: null
            })

            state.dispatch('makeFirstMove');
        },
        getUserInformation(state) {
            apiCalls.getUserInformation();
        },
        checkIfNewScoreHigherThanOld(state) {
            let oldScore = state.getters.highScoreUserAllTime;
            let newScore = state.getters.finalStreakScore;

            if (newScore > oldScore) {
                store.commit('setHighScoreUserAllTime', newScore);

                apiCalls.saveInformationUser(state.getters.userId, newScore);
            }
        }
    }
})

export default store;
