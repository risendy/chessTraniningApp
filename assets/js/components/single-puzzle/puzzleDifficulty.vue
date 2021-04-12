<template>
  <div>
      <label class="difficulty-level-label"><i class="fas fa-balance-scale"></i> Puzzle difficulty level: </label>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" v-on:change="difficultyChanged" v-model="puzzleDifficulty" value="easy" id="customRadioInline1" name="customRadioInline" class="custom-control-input">
        <label class="custom-control-label" for="customRadioInline1">Easy</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" v-on:change="difficultyChanged" v-model="puzzleDifficulty" value="medium" id="customRadioInline2" name="customRadioInline" class="custom-control-input">
        <label class="custom-control-label" for="customRadioInline2">Medium</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" v-on:change="difficultyChanged" v-model="puzzleDifficulty" value="hard" id="customRadioInline3" name="customRadioInline" class="custom-control-input">
        <label class="custom-control-label" for="customRadioInline3">Hard</label>
      </div>
  </div>
</template>

<script>
import store from '../../store/store.js';

export default{
  data: () => ({
    puzzleDifficulty: 'medium',
  }),
  methods: {
    difficultyChanged() {
      store.commit('changePuzzleDifficulty', this.puzzleDifficulty);
    },
  },
}

</script>
