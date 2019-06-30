import Vue from 'vue';
import LineChartContainer from './components/ChartContainer.vue'

var appMainComponent = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    components: {
    	'line-chart-container': LineChartContainer
    },
    data: function () {
        return {
            isLoaded: false,
            chartdata: {
              type: Object,
              default: null
            },
            options: {
              type: Object,
              default: null
            }
        }
    },
});


