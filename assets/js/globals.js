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
var progressInformation = '<p id="progressInformation" v-html="progressInformationValue" class="card-text"></p>';
var progressInformationValue = '';
var puzzleRanking = '<span id="puzzleRanking" v-html="puzzleRankingValue"></span>';
var playerRankingDifference = '<span id="playerRankingDifference" v-html="playerRankingDifferenceValue"></span>';
var playerRankingDifferenceValue = '';
var puzzleRankingDifference = '<span id="puzzleRankingDifference" v-html="puzzleRankingDifferenceValue"></span>';
var puzzleRankingDifferenceValue = '';
var showSolution = '<a id="show_solution_button" href="#" class="btn btn-primary" v-if="showSolutionFlag">Show solution <i class="fas fa-info-circle"></i></a>';
var showSolutionFlag = false;
var playerRanking = '<span id="playerRanking" v-html="playerRankingValue"></span>';
var status = '<span id="status" v-html="statusValue"></span>';

var globalObject = new Vue({
    data: {
        game,
        solution,
        solutionCopy,
        currentPosition,
        playerRanking,
        playerRankingValue,
        puzzleRanking,
        puzzleRankingValue,
        puzzleActive,
        userId,
        status,
        progressInformation,
        progressInformationValue,
        playerRankingDifference,
        playerRankingDifferenceValue,
        puzzleRankingDifference,
        puzzleRankingDifferenceValue,
        showSolution,
        showSolutionFlag,
        statusValue
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



export default globalObject;