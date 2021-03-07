<template>
  <div>
    <div class="row">
      <label class="difficulty-level-label">Puzzle difficulty level: </label>
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
    <div class="row">
      <button type="button" class="btn btn-primary next-position-button" @click="$emit('getposition')">Next position <i class="fas fa-arrow-right"></i></button>
      <show-solution-component @showsolution="showsolution"></show-solution-component>
    </div>
  </div>
</template>

<script>
import store from '../store/store.js';
import * as Func from "../modules/functions";
import showSolutionComponent from "./showSolutionComponent";

export default{
  components: {
    'show-solution-component': showSolutionComponent,
  },
  data: () => ({
    puzzleDifficulty: 'medium',
  }),
  methods: {
    difficultyChanged() {
      store.commit('changePuzzleDifficulty', this.puzzleDifficulty);
    },
    showsolution() {
      Func.showSolutionFunc();
    },
  },
}

</script>
