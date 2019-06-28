import Vue from 'vue';
import globalObject from './../globals.js';

var showSolutionComponent = Vue.component('show-solution-component', {
    data: function () {
        return {
            showSolution: globalObject.showSolution
        }
    },
    template: globalObject.showSolution,
    computed: {
        showSolutionFlag() {
            return globalObject.showSolutionFlag;
        }
    },
});

export default showSolutionComponent;
