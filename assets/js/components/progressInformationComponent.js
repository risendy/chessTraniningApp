import Vue from 'vue';
import globalObject from './../globals.js';

var progressInformationComponent = Vue.component('progress-information-component', {
    data: function () {
        return {
            progressInformation: globalObject.progressInformation,
        }
    },
    computed: {
        progressInformationValue() {
            return globalObject.progressInformationValue;
        }
    },
    template: globalObject.progressInformation
});

export default progressInformationComponent;
