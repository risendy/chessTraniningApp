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
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
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

  statusEl.html(status);
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
        }
     }
     else 
     {
        setProgressInfo(false);
        resetGame();
     }
}

var setProgressInfo = function(type) {
    if (type) 
    {
        progressInformation.html('Good move, keep on :)');
    }
    else 
    {
        progressInformation.html('Bad move :(');
    }
}

var setPuzzleCompleted = function() {
  progressInformation.html('Puzzle completed :)');
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

  var board = ChessBoard('board', 'start');
}


var game = new Chess();
var solution = null;
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

    updateStatus(); 
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    $.LoadingOverlay("hide");
  });
  
});