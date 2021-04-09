<template>
  <div>
    <h5> Game mode </h5>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
      <label class="form-check-label" for="inlineRadio1">Endless</label>
    </div>
    <div class="mt-2 text-center">
      <button v-if="isVisible" v-on:click="fetchPuzzles" class="btn btn-primary">Start</button>
    </div>
  </div>
</template>

<script>
import * as ajaxFunc from '../modules/ajaxCalls.js';
import store from '../store/store.js';
import * as Func from "../modules/functions";

export default{
  data: () => ({

  }),
  methods: {
    fetchPuzzles: function (event) {
        let puzzleSet = ajaxFunc.getPuzzlesSet().then(
            (response) => {
              store.state.showSolutionFlag = false;
              store.dispatch('resetPuzzleAndGameValues');
              store.commit('clearFinalScore');
              store.commit('clearSolvedPuzzles');
              store.commit('setPuzzleSet', response);
              store.dispatch('loadNextPuzzleFromSet');
            }
        );
    },
  },
  computed: {
    isVisible: function() {
      return store.getters.startButtonStreak;
    }
  }
}

</script>
