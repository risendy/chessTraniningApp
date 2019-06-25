import Chess from "./chess";
import Vue from 'vue';

var game = new Chess();
var solution = null;
var solutionCopy = null;
var currentPosition = null;
var playerRankingValue = null;
var puzzleRankingValue = null;
var puzzleActive = false;
var userId = $("#userId").val();

var globalObject = new Vue({
    data: {
        game,
        solution,
        solutionCopy,
        currentPosition,
        playerRankingValue,
        puzzleRankingValue,
        puzzleActive,
        userId,
    },
    computed: {

    },
    methods: {

    }
});

export default globalObject;