import store from "../store/store.js";
import * as ajaxFunc from '../modules/ajaxCalls.js';
import {appMainComponent} from "../chessboard_script";

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
export function onDragStart(source, piece, position, orientation) {
    var moves = store.getters.game.moves({
        square: source,
        verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    greySquare(source)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to)
    }

    if (store.getters.game.game_over() === true ||
        (store.getters.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (store.getters.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
};

export function onDrop(source, target) {
    removeGreySquares()

    var playerMove = makeMove(source, target);

    if (playerMove)
    {
        var solutionMove = getNextMoveFromSolution(store.getters.solution);
        checkPlayerSolution(playerMove, solutionMove);
    }

    // illegal move
    if (playerMove === null) return 'snapback';

    updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
export function onSnapEnd() {
    store.getters.board.position(store.getters.game.fen());
};

export function initNewPosition(fen, pgn) {
    store.getters.game.load_pgn(pgn);

    store.dispatch('changeCfg', {fen: fen, draggable:true});
    store.commit('initBoard', store.getters.cfg);

    store.state.currentMove = store.getters.game.history().length;
    store.state.gameHistory = store.getters.game.history();
}

export function setSolutionArray(solution) {
    var solutionTmp = JSON.parse(solution);
    solutionTmp.array.reverse();

    return solutionTmp.array;
}

export function updateStatus() {
    if (!store.getters.puzzleActive)
    {
        return;
    }

    var status = '';
    var moveIcon = '<i class="fas fa-chess-king" style="color:#ced4da; padding-right:5px;"></i>';
    var moveColor = 'White';
    store.state.cfg.orientation='white';

    if (store.getters.game.turn() === 'b') {
        moveColor = 'Black';
        moveIcon = '<i class="fas fa-chess-king" style="padding-right:5px;"></i>';
        cfg.orientation='black';
    }

    //update orientation
    store.state.board = ChessBoard('board', store.getters.cfg);

    // checkmate?
    if (store.getters.game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (store.getters.game.in_draw() === true) {
        status = 'Game over, drawn position';
    }

    // game still on
    else {
        status = moveColor + ' to move';

        // check?
        if (store.getters.game.in_check() === true) {
            status += ', ' + moveColor + ' is in check';
        }
    }

    store.state.statusValue = status;
};

export function calculateNewRankings(result) {
    var k = 32;
    var s1,s2;
    var resultArray = {};
    var floatUserRanking = parseFloat(store.getters.playerRankingValue);
    var floatPuzzleRanking = parseFloat(store.getters.puzzleRankingValue);

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

    store.state.progressInformationValue=html;
}

export function displayPuzzleInformation() {
    var puzzleRating = store.getters.puzzleRankingValue;
    var puzzleTotalTimesTried = store.getters.puzzleInformationTotalTries;
    var puzzleSuccessRate = store.getters.puzzleSuccessRate;
    var timeElapsed = store.getters.getPuzzleElapsedTime;

    const html = `
        <i class="fas fa-info-circle" style="color:green"></i> Puzzle information: 
        <p class="puzzle-info-paragraph"> Puzzle rating: ${puzzleRating}</p>
        <p class="puzzle-info-paragraph"> Times solved: ${puzzleTotalTimesTried}</p>
        <p class="puzzle-info-paragraph"> Success rate: ${puzzleSuccessRate}%</p>
        <p class="puzzle-info-paragraph"> Time spent: ${timeElapsed} [s]</p>
    `;

    const greeting = `Hello ${name}`
    store.state.puzzleInformation = html;
}

export function removeGreySquares() {
    $('.square-55d63').css('background', '')
}

export function getNextMoveFromSolution(solution) {
    var nextMove = solution.pop();
    return nextMove;
}

export function changePlayerRatingInTemplate(newRating) {
    var playerRating = store.getters.playerRankingValue;
    var difference = calculateRankingDifference(playerRating, newRating);

    if (newRating > playerRating)
    {
        var icon = '<i class="fas fa-plus" style="color:green;"></i>';
    }
    else
    {
        var icon = '<i class="fas fa-minus" style="color:red;"></i>';
    }

    store.dispatch('setPlayerRatingInformation', {
        playerRankingDifferenceValue: '('+ icon + difference + ')',
        playerRankingValue: newRating
    });

    setNewPlayerRating(newRating);
}

export function changePuzzleRankingInTemplate(newPuzzleRanking) {
    var difference = calculateRankingDifference(store.getters.puzzleRankingValue, newPuzzleRanking);
    var icon;

    if (newPuzzleRanking > store.getters.puzzleRankingValue)
    {
        icon = '<i class="fas fa-plus" style="color:green;"></i>';
    }
    else
    {
        icon = '<i class="fas fa-minus" style="color:red;"></i>';
    }

    store.state.puzzleRankingValue = newPuzzleRanking;
    store.state.puzzleRankingDifferenceValue = '('+icon+difference+')';
}

export function calculateRankingDifference(ranking1, ranking2) {
    return Math.abs(parseFloat(ranking1) - parseFloat(ranking2)).toFixed(2);
}

export function setNewPlayerRating(newRating) {
    store.state.playerRankingValue = newRating;
}

export function setPuzzleCompleted() {
    var html = '<i class="fas fa-check" style="color:green"></i> Puzzle completed :)';

    store.state.progressInformationValue=html;
    store.state.puzzleActive = false;
}

export function showSolutionFunc() {
    store.getters.game.load(store.getters.currentPosition);

    var nextMove = getNextMoveFromSolution(store.getters.solutionCopy);

    if (nextMove)
    {
        var movesNextMove = nextMove.split("-");
        var playerMove = makeMove(movesNextMove[0], movesNextMove[1]);

        var newFen = store.getters.game.fen();

        store.dispatch('changeCfg', {fen: newFen, draggable: false});
        store.state.board = ChessBoard('board', store.getters.cfg);
        store.state.showSolutionFlag = false;
    }
}

export function makeMove(from, to) {
    var move = store.getters.game.move({
        from: from,
        to: to,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    store.dispatch('updateGameHistory');
    store.state.currentMove++;

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

export function checkPlayerSolution(playerMove, solutionMove) {
    var movesSolution = solutionMove.split("-");

    if (movesSolution[0] == playerMove.from && movesSolution[1] == playerMove.to)
    {
        var nextMove = getNextMoveFromSolution(store.getters.solution);

        setProgressInfo(true);

        if (nextMove)
        {
            var movesNextMove = nextMove.split("-");
            var move = makeMove(movesNextMove[0], movesNextMove[1]);
        }
        //no more moves - ending
        else
        {
            var ratings = calculateNewRankings(true);

            store.state.puzzleResult = true;
            store.state.puzzleActive = false;
            setPuzzleCompleted();
            changePlayerRatingInTemplate(ratings.newPlayerRanking);
            changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
        }
    }
    //user error
    else
    {
        var ratings = calculateNewRankings(false);

        store.state.puzzleResult = false;
        store.state.puzzleActive = false;
        store.state.showSolutionFlag = true;
        setProgressInfo(false);
        changePlayerRatingInTemplate(ratings.newPlayerRanking);
        changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
    }

    if (!store.getters.puzzleActive)
    {
        store.dispatch('stopCountingTime');
        displayPuzzleInformation();

        ajaxFunc.savePuzzleRatingAxios(store.getters.puzzleId, ratings.newPuzzleRanking)
            .then(ajaxFunc.saveUserRankingAxios(store.getters.userId, ratings.newPlayerRanking))
            .then(ajaxFunc.saveStatisticsAxios(store.getters.userId, ratings.newPlayerRanking, store.getters.puzzleId, ratings.newPuzzleRanking, store.getters.puzzleResult, ratings.rankingDifference))
            .then(appMainComponent.forceRerenderHistory())
            .then(appMainComponent.$refs.graph.forceRerender());
    }
}
