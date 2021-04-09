<template>
  <div>
    <div class="card">
      <div class="card-body text-center pb-2">
        <h6 class="card-title"><i class="fas fa-fire"></i> Score: {{puzzleSolvedLength}}</h6>
      </div>
    </div>

    <div class="mt-3 text-center">
      <span class="text-center mr-2" v-for="item in puzzleSolvedArray">
        <i v-if="item.solved == 1" style="color:green; font-size: 17px;"  class="far fa-check-square">
          <br> {{ item.puzzleRanking }}
        </i>
        <i v-if="item.solved == 0" class="far fa-square" style="font-size: 17px">
          <br> {{ item.puzzleRanking }}
        </i>
        <i v-if="item.solved == -1"  style="color:red; font-size: 17px;" class="far fa-minus-square">
          <br> {{ item.puzzleRanking }}
        </i>
      </span>

      <show-solution-component @showsolution="showsolution"></show-solution-component>
    </div>
  </div>
</template>

<script>
import store from '../store/store.js';
import PuzzleTheme from "./puzzleTheme";
import showSolutionComponent from "./showSolutionComponent";
import * as Func from "../modules/functions";

export default{
  components: {
    PuzzleTheme,
    'show-solution-component': showSolutionComponent,
  },
  data: () => ({

  }),
  computed: {
    puzzleSolvedLength() {
      if (store.getters.puzzleSetSolved.length) return store.getters.puzzleSetSolved.length - 1;

      return store.getters.puzzleSetSolved.length;
    },
    puzzleSolvedArray() {
      return store.getters.puzzleSetSolved;
    }
  },
  methods: {
    showsolution() {
      Func.showSolutionFunc();
    },
  },
}

</script>
