<template>
  <button type="button" class="btn btn-primary" @click="$emit('showsolution')" v-if="showSolutionFlag">Show solution <i class="fas fa-info-circle"></i></button>
</template>

<script>
import Vue from 'vue';
import store from '../store/store.js';

var showSolutionComponent = Vue.component('show-solution-component', {
    data: function () {
        return {
        
        }
    },
    computed: {
        showSolutionFlag() {
            return store.getters.showSolutionFlag;
        }
    },
});

export default showSolutionComponent;
</script>
