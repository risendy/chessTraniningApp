// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  var playerMove = makeMove(source, target);

  if (playerMove)
  {
     var solutionMove = getNextMoveFromSolution();
     checkPlayerSolution(playerMove, solutionMove);
  }

  // illegal move
  if (playerMove === null) return 'snapback';

  updateStatus();
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var updateStatus = function() {

  if (!puzzleActive)
  {
    statusEl.html('');
    return;
  }

  var status = '';
  var moveIcon = '<i class="fas fa-chess-king" style="color:#ced4da; padding-right:5px;"></i>';
  var moveColor = 'White';

  if (game.turn() === 'b') {
    moveColor = 'Black';
    var moveIcon = '<i class="fas fa-chess-king" style="padding-right:5px;"></i>';
  }


  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html('<h4>'+moveIcon+status+'</h4>');
};

var initNewPosition = function(fen) {
    game.load(fen);
    cfg.position = fen;
    board = ChessBoard('board', cfg);
}

var setSolutionArray = function(solution) {
    solutionTmp = JSON.parse(solution);
    solutionTmp.array.reverse();

    return solutionTmp.array;
}

var getNextMoveFromSolution = function() {
    var nextMove = solution.pop();
    return nextMove;
}

var makeMove = function(from, to) {
    var move = game.move({
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
        setProgressInfo(true);
        nextMove = getNextMoveFromSolution();

        if (nextMove)
        {
          var movesNextMove = nextMove.split("-");
          var move = makeMove(movesNextMove[0], movesNextMove[1]);
        }
        //no more moves - ending
        else
        {
            setPuzzleCompleted();
            var ratings = calculateNewRankings(true);
            changePlayerRatingInTemplate(ratings.newPlayerRanking);
            changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
        }
     }
     else 
     {
        setProgressInfo(false);
        var ratings = calculateNewRankings(false);
        changePlayerRatingInTemplate(ratings.newPlayerRanking);
        changePuzzleRankingInTemplate(ratings.newPuzzleRanking);

        resetGame();
     }
}

var setProgressInfo = function(type) {
    if (type) 
    {
        progressInformation.html('<h4> <i class="fas fa-check" style="color:green"></i> Good move, keep on :) </h4>');
    }
    else 
    {
        progressInformation.html('<h4> <i class="fas fa-times" style="color:red"></i> Bad move :( </h4>');
    }
}

var setPuzzleCompleted = function() {
  progressInformation.html('<h4> <i class="fas fa-check" style="color:green"></i> Puzzle completed :) </h4>');
  puzzleActive = false;
}

var calculateNewRankings = function(result) {
 var k = 32;
 var s1,s2;
 var resultArray = {};

 if (playerRankingValue && puzzleRankingValue)
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

   var r1 = parseFloat(Math.pow(10, playerRankingValue/400));
   var r2 = parseFloat(Math.pow(10, puzzleRankingValue/400));

   var e1 = parseFloat(r1/(r1+r2));
   var e2 = parseFloat(r2/(r1+r2));

   var param1Part2 = s1-e1;
   var newPlayerRanking = playerRankingValue+(k*param1Part2);
   newPuzzleRanking = newPlayerRanking.toFixed(2);

   var param2Part2 = s2-e2;
   var newPuzzleRanking = playerRankingValue+(k*param2Part2);
   newPuzzleRanking = newPuzzleRanking.toFixed(2);

   resultArray = {newPlayerRanking: newPlayerRanking, newPuzzleRanking: newPuzzleRanking}
 }

 return resultArray;

}


var resetGame = function(type) {
  var game = new Chess();

  var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };

  board = ChessBoard('board', 'start');
  puzzleActive = false;
}

var changePlayerRatingInTemplate = function(newRating) {
  var difference = Math.abs(playerRankingValue - newRating);

  if (newRating > playerRankingValue)
  {
      var icon = '<i class="fas fa-plus" style="color:green;"></i>';
      var span = '<span style="color:green;">'+difference+'</span>';
  }
  else 
  {
      var icon = '<i class="fas fa-minus" style="color:red;"></i>';
      var span = '<span style="color:red;">'+difference+'</span>';
  }

  playerRankingBox.html(newRating + '('+icon+span+')');
}

var changePuzzleRankingInTemplate = function(newPuzzleRanking) {
  var difference = Math.abs(puzzleRankingValue - newPuzzleRanking);

  if (newPuzzleRanking > puzzleRankingValue)
  {
      var icon = '<i class="fas fa-plus" style="color:green;"></i>';
      var span = '<span style="color:green;">'+difference+'</span>';
  }
  else 
  {
      var icon = '<i class="fas fa-minus" style="color:red;"></i>';
      var span = '<span style="color:red;">'+difference+'</span>';
  }

  puzzleRankingBox.html(newPuzzleRanking + '('+icon+span+')');
}

var saveNewRatings = function(type) {
  
}

var game = new Chess();
var solution = null;
var playerRankingValue = parseFloat($('#userRanking').html());
var playerRankingBox = $('#userRanking');
var puzzleRankingValue = null;
var puzzleRankingBox = $('#puzzleRanking');
var puzzleActive = false;

statusEl = $('#status');
progressInformation = $('#progressInformation');

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
};

board = ChessBoard('board', cfg);

updateStatus(); 

$('#next_position').click(function(event) {
  event.preventDefault();

  $.LoadingOverlay("show");  

  $.ajax({
    url: Routing.generate('ajax_get_position_for_template'),
    type: 'POST',
    dataType: 'json'
  })
  .done(function(response) {
    console.log("success");

    initNewPosition(response.fen);
    solution = setSolutionArray(response.solution);
    puzzleRankingValue = parseFloat(response.puzzleRanking);
    puzzleActive = true;

    updateStatus(); 
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    $.LoadingOverlay("hide");
  });
  
});