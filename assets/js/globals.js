import Chess from "./chess";
import Vue from 'vue';

var game = new Chess();
var solution = null;
var solutionCopy = null;
var currentPosition = null;
var playerRankingValue = null;
var puzzleRankingValue = null;
var statusValue = null;
var puzzleActive = false;
var userId = $("#userId").val();
var progressInformationValue = '';
var playerRankingDifferenceValue = '';
var puzzleRankingDifferenceValue = '';
var showSolutionFlag = false;
var puzzleInformation = '';
var puzzleInformationTotalTries = '';
var puzzleSuccessRate = '';

var store = new Vue({
    data: {
        game,
        solution,
        solutionCopy,
        currentPosition,
        playerRankingValue,
        puzzleRankingValue,
        puzzleActive,
        userId,
        progressInformationValue,
        playerRankingDifferenceValue,
        puzzleRankingDifferenceValue,
        showSolutionFlag,
        statusValue,
        puzzleInformation,
        puzzleInformationTotalTries,
        puzzleSuccessRate
    },
    computed: {

    },
    methods: {
        setProgressInformationAction (newValue) {
            if (this.debug) console.log('setProgressInformationAction triggered with', newValue)
            this.progressInformation = newValue
        },
    }
});



export default store;