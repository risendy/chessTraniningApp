<template>
    <span id="status" v-if="puzzleActive" v-html="statusValue"></span>
</template>

<script>
import Vue from 'vue';
import store from '../../store/store.js';

var statusComponent = Vue.component('status-component', {
    data: function () {
        return {
            
        }
    },
    computed: {
      statusValue() {
            return store.getters.statusValue;
      },
      puzzleActive() {
        return store.getters.puzzleActive;
      },
    }
});

export default statusComponent;
</script>
