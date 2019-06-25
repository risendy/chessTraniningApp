import Chess from './chess.js';
import globalObject from './globals.js';

import Vue from 'vue';

var progressInformationComponent = new Vue({
    el: '#progressInformation',
    data: {
        progressInformation: ''
    }
});

var statusComponent = new Vue({
    el: '#status',
    data: {
        status: ''
    }
});

var puzzleRatingComponent = new Vue({
    el: '#puzzleRanking',
    data: {
        puzzleRanking: ''
    }
});

var playerRatingDifferenceComponent = new Vue({
    el: '#playerRatingDifference',
    data: {
        playerRatingDifference: ''
    }
});

var puzzleRatingDifferenceComponent = new Vue({
    el: '#puzzleRatingDifference',
    data: {
        puzzleRatingDifference: ''
    }
});

var showSolutionComponent = new Vue({
    el: '#show_solution_button',
    data: {
        showSolution: false
    }
});

var userRatingComponent = new Vue({
    el: '#userRankingValue',
    data: {
        userRankingValue: ''
    },
    beforeMount: function() {
        this.userRankingValue = this.$el.attributes['data-user-ranking'].value;
        globalObject.playerRankingValue = this.userRankingValue;
    }
});


// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (globalObject.game.game_over() === true ||
      (globalObject.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (globalObject.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  var playerMove = makeMove(source, target);

  if (playerMove)
  {
     var solutionMove = getNextMoveFromSolution(globalObject.solution);
     checkPlayerSolution(playerMove, solutionMove);
  }

  // illegal move
  if (playerMove === null) return 'snapback';

  updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(globalObject.game.fen());
};

var updateStatus = function() {
  if (!globalObject.puzzleActive)
  {
      statusComponent.status = '';
      return;
  }

  var status = '';
  var moveIcon = '<i class="fas fa-chess-king" style="color:#ced4da; padding-right:5px;"></i>';
  var moveColor = 'White';
  cfg.orientation='white';

  if (globalObject.game.turn() === 'b') {
    moveColor = 'Black';
    moveIcon = '<i class="fas fa-chess-king" style="padding-right:5px;"></i>';
    cfg.orientation='black';
  }

  //update orientation
  board = ChessBoard('board', cfg);

  // checkmate?
  if (globalObject.game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (globalObject.game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (globalObject.game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusComponent.status = '<h4>'+moveIcon+status+'</h4>';
};

var initNewPosition = function(fen) {
    globalObject.game.load(fen);

    cfg.position = fen;
    cfg.draggable = true;

    board = ChessBoard('board', cfg);
}

var setSolutionArray = function(solution) {
    var solutionTmp = JSON.parse(solution);
    solutionTmp.array.reverse();

    return solutionTmp.array;
}

var getNextMoveFromSolution = function(solution) {
    var nextMove = solution.pop();
    return nextMove;
}

var makeMove = function(from, to) {
    var move = globalObject.game.move({
      from: from,
      to: to,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    return move;
}

var checkPlayerSolution = function(playerMove, solutionMove) {
     var movesSolution = solutionMove.split("-");

     if (movesSolution[0] == playerMove.from && movesSolution[1] == playerMove.to)
     {
        var nextMove = getNextMoveFromSolution(globalObject.solution);

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

            globalObject.puzzleResult = true;
            globalObject.puzzleActive = false;
            setPuzzleCompleted();
            changePlayerRatingInTemplate(ratings.newPlayerRanking);
            changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
        }
     }
     //user error
     else
     {
        var ratings = calculateNewRankings(false);

        globalObject.puzzleResult = false;
        globalObject.puzzleActive = false;
        showSolutionComponent.showSolution = true;
        setProgressInfo(false);
        changePlayerRatingInTemplate(ratings.newPlayerRanking);
        changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
     }

    if (!globalObject.puzzleActive && (globalObject.puzzleRankingValue != ratings.newPuzzleRanking || globalObject.playerRankingValue != ratings.newPlayerRanking))
    {
        saveRatingToDatabase(globalObject.userId, ratings.newPlayerRanking, globalObject.puzzleId, ratings.newPuzzleRanking, globalObject.puzzleResult);
    }

}

var setProgressInfo = function(type) {
    var html;

    if (type)
    {
        html = '<i class="fas fa-check" style="color:green"></i> Good move, keep on :)';
    }
    else
    {
        html = '<i class="fas fa-times" style="color:red"></i> Bad move :(';
    }

    progressInformationComponent.progressInformation = html;
}

var setPuzzleCompleted = function() {
    var html = '<i class="fas fa-check" style="color:green"></i> Puzzle completed :)';
    progressInformationComponent.progressInformation = html;

    globalObject.puzzleActive = false;
}

var calculateNewRankings = function(result) {
 var k = 32;
 var s1,s2;
 var resultArray = {};
 var floatUserRating = parseFloat(globalObject.playerRankingValue);
 var floatPuzzleRating = parseFloat(globalObject.puzzleRankingValue);

 if (floatUserRating && floatPuzzleRating)
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

   var r1 = parseFloat(Math.pow(10, floatUserRating/400));
   var r2 = parseFloat(Math.pow(10, floatPuzzleRating/400));

   var e1 = parseFloat(r1/(r1+r2));
   var e2 = parseFloat(r2/(r1+r2));

   var param1Part2 = s1-e1;
   var newPlayerRanking = floatUserRating+(k*param1Part2);

   newPlayerRanking = parseFloat(newPlayerRanking).toFixed(2);

   var param2Part2 = s2-e2;
   var newPuzzleRanking = floatPuzzleRating+(k*param2Part2);
   newPuzzleRanking = parseFloat(newPuzzleRanking).toFixed(2);

   resultArray = {newPlayerRanking: newPlayerRanking, newPuzzleRanking: newPuzzleRanking};
 }

 return resultArray;

}

var calculateRankingDifference = function (ranking1, ranking2) {
    return Math.abs(parseFloat(ranking1) - parseFloat(ranking2)).toFixed(2);
}

var changePlayerRatingInTemplate = function(newRating) {
  var playerRating = globalObject.playerRankingValue;
  var difference = calculateRankingDifference(playerRating, newRating);

  if (newRating > playerRating)
  {
      var icon = '<i class="fas fa-plus" style="color:green;"></i>';
  }
  else
  {
      var icon = '<i class="fas fa-minus" style="color:red;"></i>';
  }

    playerRatingDifferenceComponent.playerRatingDifference = '('+ icon + difference + ')';
    userRatingComponent.userRankingValue = newRating;
    setNewPlayerRating(newRating);
}

var setNewPlayerRating = function(newRating) {
    globalObject.playerRankingValue = newRating;
}

var changePuzzleRankingInTemplate = function(newPuzzleRanking) {
  var difference = calculateRankingDifference(globalObject.puzzleRankingValue, newPuzzleRanking);
  var icon;

  if (newPuzzleRanking > globalObject.puzzleRankingValue)
  {
      icon = '<i class="fas fa-plus" style="color:green;"></i>';
  }
  else
  {
      icon = '<i class="fas fa-minus" style="color:red;"></i>';
  }

  puzzleRatingComponent.puzzleRanking = globalObject.puzzleRankingValue;
  puzzleRatingDifferenceComponent.puzzleRatingDifference = '('+icon+difference+')';
}

var resetValuesInTemplateAfterChangingPosition = function () {
    playerRatingDifferenceComponent.playerRatingDifference = null;
    puzzleRatingDifferenceComponent.puzzleRatingDifference= null;
    puzzleRatingComponent.puzzleRanking = '?';
}

var hideProgressInfo = function () {
    //globalObject.progressInformation.html('');
}

var disableShowSolutionButton = function () {
    showSolutionComponent.showSolution = false;
}

updateStatus();

var cfg = {
    draggable: true,
    orientation: 'white',
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

var board = ChessBoard('board', cfg);

//TODO convert to axios
var saveRatingToDatabase = function (userId, newPlayerRating, puzzleId, newPuzzleRating, puzzleResult) {
    $.LoadingOverlay("show");

    $.ajax({
        url: Routing.generate('ajax_set_rating'),
        type: 'POST',
        dataType: 'json',
        data: {userId:userId, newPlayerRating: newPlayerRating, puzzleId:puzzleId, newPuzzleRating:newPuzzleRating, puzzleResult:puzzleResult}
    })
        .done(function(response) {
            //console.log("success");
        })
        .fail(function() {
            //console.log("error");
        })
        .always(function() {
            $.LoadingOverlay("hide");
        });
}

//TODO convert to axios
$(document).on( "click", "#show_solution_button", function(event) {
    event.preventDefault();

    globalObject.game.load(globalObject.currentPosition);

    var nextMove = getNextMoveFromSolution(globalObject.solutionCopy);

    if (nextMove)
    {
        var movesNextMove = nextMove.split("-");
        var playerMove = makeMove(movesNextMove[0], movesNextMove[1]);

        var newFen = globalObject.game.fen();

        cfg.position = newFen;
        cfg.draggable = false;
        board = ChessBoard('board', cfg);
        showSolutionComponent.showSolution = false;
    }
});

//TODO convert to axios
$('#next_position').click(function(event) {
  event.preventDefault();
  progressInformationComponent.progressInformation='';

  $.LoadingOverlay("show");  

  hideProgressInfo();

  $.ajax({
    url: Routing.generate('ajax_get_position_for_template'),
    type: 'POST',
    dataType: 'json'
  })
  .done(function(response) {
    globalObject.currentPosition = response.fen;

    initNewPosition(response.fen);
    globalObject.solution = setSolutionArray(response.solution);
    globalObject.solutionCopy = setSolutionArray(response.solution);
    globalObject.puzzleRankingValue = parseFloat(response.puzzleRanking).toFixed(2);
    globalObject.puzzleActive = true;
    globalObject.puzzleId = response.puzzleId;

    resetValuesInTemplateAfterChangingPosition();
    updateStatus();
  })
  .fail(function() {

  })
  .always(function() {
    $.LoadingOverlay("hide");
  });
  
});