import Vue from 'vue';
import store from './store/store.js';
import axios from 'axios';
import progressInformationComponent from './components/progressInformationComponent.vue';
import puzzleRankingComponent from './components/puzzleRankingComponent.vue';
import playerRankingDifference from './components/playerRankingDifferenceComponent.vue';
import puzzleRankingDifferenceComponent from './components/puzzleRankingDifferenceComponent.vue';
import showSolutionComponent from './components/showSolutionComponent.vue';
import playerRankingComponent from './components/playerRankingComponent.vue';
import PuzzleInformationComponent from './components/puzzleInformationComponent.vue';
import statusComponent from './components/statusComponent.vue';
import LineChartContainerMini from './components/ChartContainerMini.vue'
import NextPosition from './components/nextPosition.vue'
import GameHistory from './components/gameHistoryComponent.vue'
import * as ajaxFunc from './modules/ajaxCalls.js';
import * as Func from './modules/functions.js';

var appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        statusValue: 0,
        ratingsDifference: []
    },
    components: {
        'progress-information-component': progressInformationComponent,
        'puzzle-information-component': PuzzleInformationComponent,
        'puzzle-ranking-component': puzzleRankingComponent,
        'player-ranking-difference-component': playerRankingDifference,
        'puzzle-ranking-difference-component': puzzleRankingDifferenceComponent,
        'show-solution-component': showSolutionComponent,
        'player-ranking-component': playerRankingComponent,
        'status-component': statusComponent,
        'line-chart-container': LineChartContainerMini,
        'next-position': NextPosition,
        'game-history-component': GameHistory
    },
    methods: {
      getposition: function () {
          store.state.progressInformationValue='';
          Func.resetPuzzleInformation();
          Func.resetGameHistory();

          ajaxFunc.getRandomPosition();
      },
      showsolution: function() {
          Func.showSolutionFunc();
      },
      forceRerenderHistory: function () {
            axios.get(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:5} ))
                .then(response => {
                    this.ratingsDifference = response.data.difference;
                })
                .catch(error => console.log(error));
        },

    },
    created: function () {
        axios.get(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:5} ))
            .then(response => {
                this.ratingsDifference = response.data.difference;
            })
            .catch(error => console.log(error));
    }

});

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
    var moves = store.getters.game.moves({
        square: source,
        verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    Func.greySquare(source)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        Func.greySquare(moves[i].to)
    }

  if (store.getters.game.game_over() === true ||
      (store.getters.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (store.getters.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  Func.removeGreySquares()

  var playerMove = Func.makeMove(source, target);

  if (playerMove)
  {
     var solutionMove = Func.getNextMoveFromSolution(store.getters.solution);
     checkPlayerSolution(playerMove, solutionMove);
  }

  // illegal move
  if (playerMove === null) return 'snapback';

    Func.updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
    store.getters.board.position(store.getters.game.fen());
};

var checkPlayerSolution = function(playerMove, solutionMove) {
     var movesSolution = solutionMove.split("-");

     if (movesSolution[0] == playerMove.from && movesSolution[1] == playerMove.to)
     {
        var nextMove = Func.getNextMoveFromSolution(store.getters.solution);

        Func.setProgressInfo(true);

        if (nextMove)
        {
          var movesNextMove = nextMove.split("-");
          var move = Func.makeMove(movesNextMove[0], movesNextMove[1]);
        }
        //no more moves - ending
        else
        {
            var ratings = Func.calculateNewRankings(true);

            store.state.puzzleResult = true;
            store.state.puzzleActive = false;
            Func.setPuzzleCompleted();
            Func.changePlayerRatingInTemplate(ratings.newPlayerRanking);
            Func.changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
        }
     }
     //user error
     else
     {
        var ratings = Func.calculateNewRankings(false);

        store.state.puzzleResult = false;
        store.state.puzzleActive = false;
        store.state.showSolutionFlag = true;
        Func.setProgressInfo(false);
        Func.changePlayerRatingInTemplate(ratings.newPlayerRanking);
        Func.changePuzzleRankingInTemplate(ratings.newPuzzleRanking);
     }

     if (!store.getters.puzzleActive)
     {
         Func.displayPuzzleInformation();

         ajaxFunc.savePuzzleRatingAxios(store.getters.puzzleId, ratings.newPuzzleRanking)
         .then(ajaxFunc.saveUserRankingAxios(store.getters.userId, ratings.newPlayerRanking))
         .then(ajaxFunc.saveStatisticsAxios(store.getters.userId, ratings.newPlayerRanking, store.getters.puzzleId, ratings.newPuzzleRanking, store.getters.puzzleResult, ratings.rankingDifference))
         .then(appMainComponent.forceRerenderHistory())
         .then(appMainComponent.$refs.graph.forceRerender());
     }
}

var cfg = {
    draggable: true,
    orientation: 'white',
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

store.state.cfg = cfg;
store.commit('initBoard', cfg);
store.commit('initGame');

Func.updateStatus();

