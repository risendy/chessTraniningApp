import store from "../store/globals";

export function initNewPosition(fen, pgn) {
    store.game.load_pgn(pgn);

    store.cfg.position = fen;
    store.cfg.draggable = true;

    store.board = ChessBoard('board', store.cfg);

    store.currentMove = store.game.history().length;
    store.gameHistory = store.game.history();
}

export function setSolutionArray(solution) {
    var solutionTmp = JSON.parse(solution);
    solutionTmp.array.reverse();

    return solutionTmp.array;
}

export function resetValuesInTemplateAfterChangingPosition() {
    store.playerRankingDifferenceValue = null;
    store.puzzleRankingDifferenceValue= null;
}

export function updateStatus() {
    if (!store.puzzleActive)
    {
        return;
    }

    var status = '';
    var moveIcon = '<i class="fas fa-chess-king" style="color:#ced4da; padding-right:5px;"></i>';
    var moveColor = 'White';
    store.cfg.orientation='white';

    if (store.game.turn() === 'b') {
        moveColor = 'Black';
        moveIcon = '<i class="fas fa-chess-king" style="padding-right:5px;"></i>';
        cfg.orientation='black';
    }

    //update orientation
    store.board = ChessBoard('board', store.cfg);

    // checkmate?
    if (store.game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (store.game.in_draw() === true) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (store.game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    store.statusValue = status;
};

export function updateGameHistory() {
    var gameHistory = store.game.history();

    store.gameHistory = gameHistory;
}

export function calculateNewRankings(result) {
    var k = 32;
    var s1,s2;
    var resultArray = {};
    var floatUserRanking = parseFloat(store.playerRankingValue);
    var floatPuzzleRanking = parseFloat(store.puzzleRankingValue);

    if (floatUserRanking && floatPuzzleRanking)
    {
        if (result)
        {
            s1 = 1;
            s2 = 0;
        }
        else
        {
            s1 = 0;
            s2 = 1;
        }

        var r1 = parseFloat(Math.pow(10, floatUserRanking/400));
        var r2 = parseFloat(Math.pow(10, floatPuzzleRanking/400));

        var e1 = parseFloat(r1/(r1+r2));
        var e2 = parseFloat(r2/(r1+r2));

        var param1Part2 = s1-e1;
        var newPlayerRanking = floatUserRanking+(k*param1Part2);

        newPlayerRanking = newPlayerRanking.toFixed(2);

        var param2Part2 = s2-e2;
        var newPuzzleRanking = floatPuzzleRanking+(k*param2Part2);
        newPuzzleRanking = newPuzzleRanking.toFixed(2);

        var rankingDifference = newPlayerRanking - floatUserRanking;
        rankingDifference = rankingDifference.toFixed(2);

        resultArray = {newPlayerRanking: newPlayerRanking, newPuzzleRanking: newPuzzleRanking, rankingDifference: rankingDifference};
    }

    return resultArray;

}

export function setProgressInfo(type) {
    var html;

    if (type)
    {
        html = '<i class="fas fa-check" style="color:green"></i> Good move, keep on :)';
    }
    else
    {
        html = '<i class="fas fa-times" style="color:red"></i> Bad move :(';
    }

    store.progressInformationValue=html;
}

export function displayPuzzleInformation() {
    var puzzleRating = store.puzzleRankingValue;
    var puzzleTotalTimesTried = store.puzzleInformationTotalTries;
    var puzzleSuccessRate = store.puzzleSuccessRate;

    const html = `
        <i class="fas fa-info-circle" style="color:green"></i> Puzzle information: 
        <p class="puzzle-info-paragraph"> Puzzle rating: ${puzzleRating}</p>
        <p class="puzzle-info-paragraph"> Times solved: ${puzzleTotalTimesTried}</p>
        <p class="puzzle-info-paragraph"> Success rate: ${puzzleSuccessRate}%</p>
    `;

    const greeting = `Hello ${name}`
    store.puzzleInformation = html;
}

export function resetPuzzleInformation(){
    store.puzzleInformation = '';
}

export function removeGreySquares() {
    $('.square-55d63').css('background', '')
}

export function getNextMoveFromSolution(solution) {
    var nextMove = solution.pop();
    return nextMove;
}

export function disableShowSolutionButton() {
    store.showSolutionFlag = false;
}

export function changePlayerRatingInTemplate(newRating) {
    var playerRating = store.playerRankingValue;
    var difference = calculateRankingDifference(playerRating, newRating);

    if (newRating > playerRating)
    {
        var icon = '<i class="fas fa-plus" style="color:green;"></i>';
    }
    else
    {
        var icon = '<i class="fas fa-minus" style="color:red;"></i>';
    }

    store.playerRankingDifferenceValue = '('+ icon + difference + ')';
    store.playerRankingValue = newRating;
    setNewPlayerRating(newRating);
}

export function changePuzzleRankingInTemplate(newPuzzleRanking) {
    var difference = calculateRankingDifference(store.puzzleRankingValue, newPuzzleRanking);
    var icon;

    if (newPuzzleRanking > store.puzzleRankingValue)
    {
        icon = '<i class="fas fa-plus" style="color:green;"></i>';
    }
    else
    {
        icon = '<i class="fas fa-minus" style="color:red;"></i>';
    }

    store.puzzleRankingValue = newPuzzleRanking;
    store.puzzleRankingDifferenceValue = '('+icon+difference+')';
}

export function calculateRankingDifference(ranking1, ranking2) {
    return Math.abs(parseFloat(ranking1) - parseFloat(ranking2)).toFixed(2);
}

export function setNewPlayerRating(newRating) {
    store.playerRankingValue = newRating;
}

export function setPuzzleCompleted() {
    var html = '<i class="fas fa-check" style="color:green"></i> Puzzle completed :)';
    store.progressInformationValue=html;

    store.puzzleActive = false;
}

export function resetGameHistory() {
    store.gameHistory = '';
}

export function showSolutionFunc() {
    store.game.load(store.currentPosition);

    var nextMove = getNextMoveFromSolution(store.solutionCopy);

    if (nextMove)
    {
        var movesNextMove = nextMove.split("-");
        var playerMove = makeMove(movesNextMove[0], movesNextMove[1]);

        var newFen = store.game.fen();

        cfg.position = newFen;
        cfg.draggable = false;
        store.board = ChessBoard('board', cfg);
        store.showSolutionFlag = false;
    }
}

export function makeMove(from, to) {
    var move = store.game.move({
        from: from,
        to: to,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    updateGameHistory();
    store.currentMove++;

    return move;
}

export function greySquare(square) {
    var whiteSquareGrey = '#a9a9a9'
    var blackSquareGrey = '#696969'

    var $square = $('.square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }

    $square.css('background', background)
}