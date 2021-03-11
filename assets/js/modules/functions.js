import store from "../store/store.js";
import * as ajaxFunc from '../modules/ajaxCalls.js';

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
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
export function onSnapEnd() {
    setTimeout(function(){
        store.getters.board.position(store.getters.game.fen());
    }, 1000);
};

export function updateStatus() {
    if (!store.getters.puzzleActive)
    {
        return;
    }

    var status = '';
    var moveIcon = '<i class="fas fa-chess-king" style="color:#ced4da; padding-right:5px;"></i>';
    var moveColor = 'White';
    let html;

    store.state.cfg.orientation='white';

    if (store.getters.game.turn() === 'b') {
        moveColor = 'Black';
        moveIcon = '<i class="fas fa-chess-king" style="padding-right:5px;"></i>';
        store.state.cfg.orientation='black';
    }

    //update orientation
    store.state.board = ChessBoard('board', store.getters.cfg);
    store.dispatch('setBoardToSelectedTheme');

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

    if (store.getters.puzzleActive)
    {
        if (store.getters.game.turn() === 'b') {
            html = `<div class="alert alert-dark no-margin" role="alert">
                            <i class="fas fa-chess-king move-turn-icon"></i> ${status}
                        </div>`;
        }
        else
        {
            html = `<div class="alert no-margin" role="alert" style="color:white; background:#f87979">
                           <i class="fas fa-chess-king move-turn-icon"></i> ${status}
                        </div>`;
        }
    }
    else
    {
        html = '';
    }

    store.state.statusValue = html;
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

export function getNextMoveFromSolution(solution) {
    var nextMove = solution.pop();

    return nextMove;
}

export function calculateRankingDifference(ranking1, ranking2) {
    return Math.abs(parseFloat(ranking1) - parseFloat(ranking2)).toFixed(2);
}

function solutionRecursive(length) {
        if (length)  {
            setTimeout(function() {
                var nextMove = getNextMoveFromSolution(store.getters.solutionCopy);

                if (nextMove) {
                    var movesNextMove = nextMove.split("-");
                    var playerMove = makeMove(movesNextMove[0], movesNextMove[1]);
                    var newFen = store.getters.game.fen();
                    var history = store.getters.game.history();

                    store.dispatch('updateGameHistory', history);
                    store.state.showSolutionFlag = false;

                    store.commit('changeCfgPosition', newFen);
                    store.commit('changeCfgDraggable', false);
                    store.commit('initBoard', store.getters.cfg);
                    store.dispatch('setBoardToSelectedTheme');

                    solutionRecursive(length--);
                }
            }, 1000)
    }
}

export function showSolutionFunc() {
    let solutionLength = store.getters.solutionCopy.length;

    store.getters.game.load(store.getters.currentPosition);

    solutionRecursive(solutionLength);
}

export function makeMove(from, to) {
    var move = store.getters.game.move({
        from: from,
        to: to,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    store.dispatch('updateGameHistory');
    store.state.currentMove++;
    store.state.lastMoveSquareTo = to;

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

export function appendGoodMoveIconToSquare(square) {
    let span = document.createElement("span");
    span.className = 'icon-good-move';
    span.style.cssText = 'position: absolute;';
    span.innerHTML = `
        <i class="fas fa-square fa-stack fa-inverse" style="position: relative;top: -13px;right: -54px;font-size: 23px;color: #008000"></i>
        <i class="fas fa-check fa-stack icon-good-move" style="position: relative;top: -51px;right: -56px;font-size: 15px;color: #f3fff1;"></i>
    `;
    document.querySelector('.square-' + square).append(span);
}

export function appendGoodMoveClassSquare(square) {
    document.querySelector('.square-' + square).classList.add('good-move-square');
}

export function appendBadMoveIconToSquare(square) {
    let span = document.createElement("span");
    span.className = 'icon-bad-move';
    span.style.cssText = 'position: absolute;';
    span.innerHTML = `
        <i class="fas fa-square fa-stack fa-inverse" style="position: relative;top: -12px;right: -53px;font-size: 23px;color: #ff0000"></i>
        <i class="fas fa-times fa-stack icon-good-move" style="position: relative;top: -50px;right: -58px;font-size: 15px;color: #f3fff1;"></i>
    `;
    document.querySelector('.square-' + square).append(span);
}

export function appendBadMoveClassSquare(square) {
    document.querySelector('.square-' + square).classList.add('bad-move-square');
}

export function removeGreySquares() {
    $('.square-55d63').css('background', '')
}

export function removeGoodMoveIcons() {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements( document.querySelectorAll(".icon-good-move") );
}

export function removeGoodMoveSquareBackground() {
    let element = document.querySelector(".good-move-square");

    if (element) element.classList.remove('good-move-square');
}

export async function checkPlayerSolution(playerMove, solutionMove) {
    removeGoodMoveIcons();
    removeGoodMoveSquareBackground();

    var movesSolution = solutionMove.split("-");

    if (movesSolution[0] == playerMove.from && movesSolution[1] == playerMove.to)
    {
        var nextMove = getNextMoveFromSolution(store.getters.solution);

        store.dispatch('setProgressInfo', true);

        if (nextMove)
        {
            var movesNextMove = nextMove.split("-");
            var move = makeMove(movesNextMove[0], movesNextMove[1]);
        }
        //no more moves - ending
        else
        {
            var ratings = calculateNewRankings(true);

            store.dispatch('savePuzzleInformation', {
                puzzleResult: true,
                puzzleActive: false
            });

            store.dispatch('setPuzzleCompleted')
            store.dispatch('changePlayerRatingInTemplate', ratings.newPlayerRanking)
            store.dispatch('changePuzzleRankingInTemplate', ratings.newPuzzleRanking)
        }
    }
    //user error
    else
    {
        var ratings = calculateNewRankings(false);

        store.dispatch('savePuzzleInformation', {
            puzzleResult: false,
            puzzleActive: false
        });

        store.state.showSolutionFlag = true;
        store.dispatch('setProgressInfo', false);
        store.dispatch('changePlayerRatingInTemplate', ratings.newPlayerRanking)
        store.dispatch('changePuzzleRankingInTemplate', ratings.newPuzzleRanking)
    }

    if (!store.getters.puzzleActive)
    {
        store.dispatch('stopCountingTime');

        ajaxFunc.savePuzzleRatingAxios(store.getters.puzzleId, ratings.newPuzzleRanking)
            .then(ajaxFunc.saveUserRankingAxios(store.getters.userId, ratings.newPlayerRanking))
            .then(ajaxFunc.saveStatisticsAxios(store.getters.userId, ratings.newPlayerRanking, store.getters.puzzleId, ratings.newPuzzleRanking, store.getters.puzzleResult, ratings.rankingDifference))
            .then(
                setTimeout(() => {
                    ajaxFunc.getPuzzleHistoryUser()
                    store.state.rerenderGraph = true
                }, 1000)
            );
    }
}
