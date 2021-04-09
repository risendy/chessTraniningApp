import axios from 'axios';
import store from "../store/store.js";

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
    return axios.post(Routing.generate('api_save_statistic'), {
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
        .request({
            method: 'POST',
            url: Routing.generate('api_get_random_position'),
            data: {
                puzzleDifficulty: store.getters.puzzleDifficulty,
                puzzleThemes: store.getters.selectedThemes
            }
        })
        .then(response => {
            store.dispatch('initNewPosition',{
                fen: response.data.fen,
                solution: response.data.solution,
                color: response.data.color
            });

            store.dispatch('setNewPositionData', {
                currentPosition: response.data.fen,
                solution: store.getters.solution,
                solutionCopy:  [...store.getters.solution],
                puzzleRankingValue: parseFloat(response.data.puzzleRanking).toFixed(2),
                puzzleActive: true,
                puzzleId: response.data.puzzleId,
                puzzleInformationTotalTries: response.data.puzzleTotalTries,
                puzzleSuccessRate: response.data.puzzleSuccessRate,
                puzzleThemes: response.data.themes
            })

            store.dispatch('resetValuesInTemplateAfterChangingPosition');
            store.dispatch('startCountingTime');
            store.dispatch('makeFirstMove');
            store.dispatch('updateGameHistory');
        })
        .catch(error => console.log(error))
        .finally($.LoadingOverlay("hide") );
}

export function getPuzzleHistoryUser() {
    axios.get(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:5} ))
        .then(response => {
            store.dispatch('setRatingDifferenceArray', response.data.difference);
        })
        .catch(error => console.log(error));
}

export async function fetchNewDataForGraph() {
    var userRankingHistory = await fetch(Routing.generate('api_get_user_history_ranking', {id: store.getters.userId, limit:10} ));
    var historyJson = userRankingHistory.json();

    return historyJson;
};

export function getPuzzlesSet() {
    $.LoadingOverlay("show");

    return axios.post(Routing.generate('api_get_random_puzzle_set'))
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error))
        .finally($.LoadingOverlay("hide") );
}
