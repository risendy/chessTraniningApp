import axios from 'axios';
import store from "../store/store.js";
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
            MyFn.initNewPosition(response.data.fen, response.data.pgn);

            store.dispatch('setNewPositionData', {
                currentPosition: response.data.fen,
                solution: MyFn.setSolutionArray(response.data.solution),
                solutionCopy:  MyFn.setSolutionArray(response.data.solution),
                puzzleRankingValue: parseFloat(response.data.puzzleRanking).toFixed(2),
                puzzleActive: true,
                puzzleId: response.data.puzzleId,
                puzzleInformationTotalTries: response.data.puzzleTotalTries,
                puzzleSuccessRate: response.data.puzzleSuccessRate
            });

            store.dispatch('resetValuesInTemplateAfterChangingPosition');

            MyFn.updateStatus();

            store.dispatch('updateGameHistory');
        })
        .catch(error => console.log(error))
        .finally($.LoadingOverlay("hide") );
}
