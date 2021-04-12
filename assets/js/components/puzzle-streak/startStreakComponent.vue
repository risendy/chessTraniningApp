<template>
  <div>
    <h5> Game mode </h5>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="endless" v-model="gameMode" checked>
      <label class="form-check-label" for="inlineRadio1">Endless</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="3min" v-model="gameMode">
      <label class="form-check-label" for="inlineRadio1">3 min</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="5min" v-model="gameMode">
      <label class="form-check-label" for="inlineRadio1">5 min</label>
    </div>
    <div class="mt-2 text-center">
      <button v-if="isVisible" v-on:click="fetchPuzzles" class="btn btn-primary">Start</button>
    </div>
  </div>
</template>

<script>
import * as ajaxFunc from '../../modules/ajaxCalls.js';
import store from '../../store/store.js';
import * as Func from "../../modules/functions";

export default{
  data: () => ({
    gameMode: 'endless',
    timerCount: 0
  }),
  watch: {
    timerStreak: {
      handler(value) {

        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            store.commit('decrementTimerStreak')
          }, 1000);
        }

        if (value === 0 && this.timerEnabled) {
          store.commit('setEnableTimer', false);
          store.commit('showEndStreakModal');
          store.commit('changeCfgDraggable', false);
          store.commit('isStartButtonStreakVisible', true);

          store.state.showSolutionFlag = true;
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  },
  methods: {
    fetchPuzzles: function (event) {
        let puzzleSet = ajaxFunc.getPuzzlesSet().then(
            (response) => {
              let timerValue;

              if (this.gameMode !== 'endless') {
                store.commit('setEnableTimer', true);

                if (this.gameMode === '3min') timerValue = 180;
                if (this.gameMode === '5min') timerValue = 300;

                store.commit('setTimerStreak', timerValue);
              }

              store.state.showSolutionFlag = false;
              store.dispatch('resetPuzzleAndGameValues');
              store.commit('clearFinalScore');
              store.commit('clearSolvedPuzzles');
              store.commit('setPuzzleSet', response);
              store.dispatch('loadNextPuzzleFromSet');
            }
        );
    },
    startTimer() {
      this.timerEnabled = true;
    },

    pauseTimer() {
      this.timerEnabled = false;
    },

    resetTimer() {
      this.timerCount = 0;
    }
  },
  computed: {
    isVisible: function() {
      return store.getters.startButtonStreak;
    },
    timerStreak() {
      return store.getters.timerStreak;
    },
    timerEnabled() {
      return store.getters.timerEnabled;
    }
  }
}

</script>
