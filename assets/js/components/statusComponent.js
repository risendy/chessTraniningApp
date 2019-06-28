import Vue from 'vue';
import globalObject from './../globals.js';

var statusComponent = Vue.component('status-component', {
    data: function () {
        return {
            status: globalObject.status,
        }
    },
    template: globalObject.status,
    computed: {
        statusValue() {
            return globalObject.statusValue;
        }
    }
});

export default statusComponent;
