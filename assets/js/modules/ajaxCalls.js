import axios from 'axios';
import store from "../globals";
import * as MyFn from './functions.js';

export function savePuzzleRatingAxios(puzzleId, newPuzzleRating) {
    $.LoadingOverlay("show");

    return axios.post(Routing.generate('api_set_position'), {
        puzzleId:puzzleId,
        newPuzzleRating:newPuzzleRating
    })
        .then(response => {

        })
        .catch(error => console.log(error))
        .finally();
}

export function saveUserRankingAxios(userId, newPlayerRating) {
    return axios.put(Routing.generate('api_put_user'), {
        userId:userId,
        newPlayerRating:newPlayerRating
    })
        .then(response => {

        })
        .catch(error => console.log(error))
        .finally();
}

export function saveStatisticsAxios(userId, newPlayerRating, puzzleId, newPuzzleRating, puzzleResult, rankingDifference) {
    return axios.post(Routing.generate('api_send_statistic_to_queue'), {
        userId: userId,
        newPlayerRating: newPlayerRating,
        puzzleId: puzzleId,
        newPuzzleRating: newPuzzleRating,
        puzzleResult: puzzleResult,
        rankingDifference:rankingDifference
    })
        .then(response => {

        })
        .catch(error => console.log(error))
        .finally(
            $.LoadingOverlay("hide")
        );
}

export function getRandomPosition() {
    $.LoadingOverlay("show");

    axios
        .get(Routing.generate('api_get_random_position'))
        .then(response => {
            store.currentPosition = response.data.fen;

            MyFn.initNewPosition(response.data.fen, response.data.pgn);
            store.solution = MyFn.setSolutionArray(response.data.solution);
            store.solutionCopy = MyFn.setSolutionArray(response.data.solution);
            store.puzzleRankingValue = parseFloat(response.data.puzzleRanking).toFixed(2);
            store.puzzleActive = true;
            store.puzzleId = response.data.puzzleId;
            store.puzzleInformationTotalTries = response.data.puzzleTotalTries;
            store.puzzleSuccessRate = response.data.puzzleSuccessRate;

            MyFn.resetValuesInTemplateAfterChangingPosition();
            MyFn.updateStatus();
            MyFn.updateGameHistory();
        })
        .catch(error => console.log(error))
        .finally($.LoadingOverlay("hide") );
}