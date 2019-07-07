<template>
    <span id="status" v-html="statusValue"></span>
</template>

<script>
import Vue from 'vue';
import store from './../globals.js';

var statusComponent = Vue.component('status-component', {
    data: function () {
        return {
            
        }
    },
    computed: {
        statusValue() {
            return store.statusValue;
        }
    }
});

export default statusComponent;
</script>