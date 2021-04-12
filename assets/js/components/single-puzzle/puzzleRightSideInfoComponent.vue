<template>
    <div class="card card-body bg-light">
        <h5><i class="fas fa-info-circle"></i> Puzzle information: </h5>

        <div v-if="puzzleRanking">
          <p class="puzzleListElement" v-if="puzzleTimeSpent > 0">
            <i class="fa fa-clock"></i> Time spent: <b> {{puzzleTimeSpent}}[s] </b>
          </p>
          <p class="puzzleListElement">
            <i class="fas fa-star-half-alt"></i> Puzzle ranking: <b> {{puzzleRanking}} </b>
          </p>
          <p class="puzzleListElement">
            <i class="fa fa-check-square"></i> Attempts: <b> {{ puzzleTotalTries }} </b>
          </p>
          <i class="fa fa-adjust"></i> Themes:
          <p class="puzzleListElement" v-for="item in puzzleThemes">
            <i class="fas fa-caret-right"></i> <b> {{item.name}} </b>
          </p>
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import store from "../../store/store";

var puzzleRightSideInfoComponent = Vue.component('puzzle-right-info-component', {
    data: function () {
        return {

        }
    },
    methods: {

    },
    computed: {
      puzzleRanking() {
        return store.getters.puzzleRankingValue;
      },
      puzzleTotalTries() {
        return store.getters.puzzleInformationTotalTries;
      },
      puzzleThemes() {
        return store.getters.puzzleThemes;
      },
      puzzleTimeSpent() {
        return store.getters.getPuzzleElapsedTime;
      },
    },
    mounted() {

    }
});

export default puzzleRightSideInfoComponent;
</script>
