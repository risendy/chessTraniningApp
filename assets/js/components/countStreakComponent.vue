<template>
  <div>
    <div class="card">
      <div class="card-body text-center pb-2">
        <h6 class="card-title"><i class="fas fa-fire"></i> Score: {{puzzleSolvedLength}}</h6>
      </div>
    </div>

    <div class="mt-3 text-center">
      <span class="text-center mr-2" v-for="item in puzzleSolvedArray">
        <i v-if="item.solved == 1" style="color:green; font-size: 14px;"  class="far fa-check-circle">
          <br> {{ item.puzzleRanking }}
        </i>
        <i v-if="item.solved == 0" class="far fa-circle" style="font-size: 14px">
          <br> {{ item.puzzleRanking }}
        </i>
        <i v-if="item.solved == -1"  style="color:red; font-size: 14px;" class="far fa-times-circle">
          <br> {{ item.puzzleRanking }}
        </i>
      </span>
    </div>
  </div>
</template>

<script>
import store from '../store/store.js';

export default{
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

  },
}

</script>
