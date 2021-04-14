<template>
  <div class="text-center">
    <h5 class="mb-3" v-if="timerEnabled">
      <i class="fas fa-clock"></i> {{secondsToHms(timerStreak)}}
    </h5>
    <div class="card">
      <div class="card-body text-center pb-2">
        <h6 class="card-title"><i class="fas fa-fire"></i> Score: {{puzzleSolvedLength}}</h6>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 text-center" v-for="item in puzzleSolvedArray">
        <div class="alert mt-3 mb-0" style="padding: 0.35rem 1.25rem" :class="{ 'alert-success': item.solved === 1, 'alert-secondary': item.solved === 0,  'alert-danger': item.solved === -1}" >
            <i v-if="item.solved == 1" style="color:green; font-size: 14px;" class="far fa-check-square">
              <br> {{ item.puzzleRanking }}
            </i>
            <i v-if="item.solved == 0" class="far fa-square" style="font-size: 14px">
              <br> {{ item.puzzleRanking }}
            </i>
            <i v-if="item.solved == -1" style="color:red; font-size: 14px;" class="far fa-minus-square">
              <br> {{ item.puzzleRanking }}
            </i>
          </div>
      </div>
    </div>

    <show-solution-component @showsolution="showsolution"></show-solution-component>
  </div>
</template>

<script>
import store from '../../store/store.js';
import PuzzleTheme from "../single-puzzle/puzzleTheme";
import showSolutionComponent from "../single-puzzle/showSolutionComponent";
import * as Func from "../../modules/functions";

export default{
  components: {
    PuzzleTheme,
    'show-solution-component': showSolutionComponent,
  },
  data: () => ({

  }),
  computed: {
    puzzleSolvedLength() {
      return store.getters.puzzleSetSolvedLength;
    },
    puzzleSolvedArray() {
      return store.getters.puzzleSetSolved;
    },
    timerStreak() {
      return store.getters.timerStreak;
    },
    timerEnabled() {
      return store.getters.timerEnabled;
    }
  },
  methods: {
    showsolution() {
      Func.showSolutionFunc();
    },
    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
        return hDisplay + mDisplay + sDisplay;
    }
  },
}

</script>
