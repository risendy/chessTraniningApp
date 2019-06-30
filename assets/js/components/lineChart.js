import { Line } from 'vue-chartjs'
import Vue from 'vue';

var lineChart = Vue.component('line-chart', {
  name: 'line-chart',
  extends: Line,
  data: function () {
        return {
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
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
});

export default lineChart;