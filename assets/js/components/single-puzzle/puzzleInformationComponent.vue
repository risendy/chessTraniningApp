<template>
    <p id="puzzleInformation" v-html="puzzleInformation" class="card-text">

    </p>
</template>

<script>
import Vue from 'vue';
import store from '../../store/store.js';

var puzzleInformationComponent = Vue.component('puzzle-information-component', {
    data: function () {
        return {

        }
    },
    computed: {
        puzzleInformation() {
            return store.getters.puzzleInformation;
        }
    },
});

export default puzzleInformationComponent;
</script>
