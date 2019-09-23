import Vue from "vue";
import Chess from './chess.js';

var appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        statusValue: 0,
        ratingsDifference: []
    },
    components: {

    },
    methods: {
        loadFen: function (event) {

        }
    },
    created: function () {
        let fen = document.getElementById("position_fen").value;

        if (!fen) {
            fen = 'start';
        }

        let chess = new Chess();

        this.cfg = {
            position: fen,
            orientation: 'white',
            draggable: false,
            pieceTheme: '/img/chesspieces/wikipedia/{piece}.png'
        };

        this.board = ChessBoard('board', this.cfg);
    }

});

export default appMainComponent;