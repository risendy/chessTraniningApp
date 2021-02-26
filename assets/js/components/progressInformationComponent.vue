<template>
    <p id="progressInformation" v-html="progressInformationValue" class="card-text"></p>
</template>

<script>
import Vue from 'vue';
import store from '../store/store.js';

var progressInformationComponent = Vue.component('progress-information-component', {
    data: function () {
        return {

        }
    },
    computed: {
        progressInformationValue() {
            return store.getters.progressInformationValue;
        }
    },
});

export default progressInformationComponent;
</script>
