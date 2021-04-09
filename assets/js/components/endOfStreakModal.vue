<template>
  <modal name="conditional-modal"
         :adaptive="true"
         :max-width="1000"
         :max-height="400"
         width="25%"
         height="50%"
         @before-open="beforeOpen"
         @before-close="beforeClose"
  >
    <div style="padding:30px;">
        <h4 class="text-center"><i class="fas fa-chess-queen"></i> Congratulations!</h4>
        <table class="table table-bordered mt-4">
          <tr>
            <td><i class="fas fa-fire"></i> Score: {{ finalScore }}</td>
          </tr>
          <tr>
            <td><i class="far fa-check-circle"></i> Highest solved puzzle: {{ highestSolvedPuzzle }}</td>
          </tr>
<!--          <tr>
            <td><i class="far fa-clock"></i> Average time per puzzle: 2s</td>
          </tr>-->
        </table>
    </div>
  </modal>
</template>
<script>
import store from '../store/store.js';

export default {
  name: 'Modal_Conditional',
  computed: {
    finalScore() {
      return store.getters.finalStreakScore;
    },
    highestSolvedPuzzle() {
      return store.getters.highestSolvedPuzzleRanking;
    },
  },
  methods: {
    beforeOpen(event) {
      if (event.params.show === false) {
        event.cancel()
      }
    },
    beforeClose(event) {
      store.commit('hideEndStreakModal');
    },
  }
}
</script>
