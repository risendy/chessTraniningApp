<template>
  <div>
    <div class="row">
      <puzzle-difficulty-component></puzzle-difficulty-component>
    </div>

    <div class="row">
      <puzzle-theme-component></puzzle-theme-component>
      <board-theme-component></board-theme-component>
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
import puzzleDifficulty from "./puzzleDifficulty";
import puzzleTheme from "./puzzleTheme";
import PuzzleTheme from "./puzzleTheme";
import changeBoardTheme from "./changeBoardTheme";

export default{
  components: {
    PuzzleTheme,
    'show-solution-component': showSolutionComponent,
    'puzzle-difficulty-component': puzzleDifficulty,
    'board-theme-component': changeBoardTheme,
    'puzzle-theme-component': puzzleTheme,
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
