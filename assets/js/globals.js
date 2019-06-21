import Chess from "./chess";

var game = new Chess();
var solution = null;
var solutionCopy = null;
var currentPosition = null;
var playerRankingValue = parseFloat($('#userRanking').html());
var playerRankingBox = $('#userRanking');
var puzzleRankingValue = null;
var puzzleRankingBox = $('#puzzleRanking');
var showSolutionButton = $('#show_solution_button');
var puzzleActive = false;
var userId = $("#userId").val();
var puzzleId;

var statusEl = $('#status');
var progressInformation = $('#progressInformation');
showSolutionButton.hide();

var globalObject = {
    game,
    solution,
    solutionCopy,
    currentPosition,
    playerRankingValue,
    playerRankingBox,
    puzzleRankingValue,
    puzzleRankingBox,
    showSolutionButton,
    puzzleActive,
    userId,
    puzzleId,
    statusEl,
    progressInformation
};

export default globalObject;

