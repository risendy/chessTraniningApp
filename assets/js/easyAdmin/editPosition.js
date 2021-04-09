import Vue from "vue";
import Chess from '../lib/chess.js';

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
            let currentFen = document.getElementById("position_fen").value;
            let chess = new Chess();

            if (chess.validate_fen(currentFen).valid)
            {
                this.cfg = {
                    position: currentFen,
                    orientation: 'white',
                    draggable: false,
                    pieceTheme: '/img/chesspieces/wikipedia/{piece}.png'
                };

                this.board = ChessBoard('board', this.cfg);
            }
            else
            {
                alert('invalid FEN. Error message: '+chess.validate_fen(currentFen).error);
            }
        }
    },
    created: function () {
        let currentFen = document.getElementById("position_fen").value;
        let chess = new Chess();

        if (!chess.validate_fen(currentFen).valid){
            currentFen = 'start';
        }

        this.cfg = {
            position: currentFen,
            orientation: 'white',
            draggable: false,
            pieceTheme: '/img/chesspieces/wikipedia/{piece}.png'
        };

        this.board = ChessBoard('board', this.cfg);


    }
});

export default appMainComponent;
