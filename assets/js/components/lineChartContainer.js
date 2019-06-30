import Vue from 'vue';
import ChartContainer from './ChartContainer.vue'
import "babel-core/register";
import "babel-polyfill";

var lineChartContainer = Vue.component('line-chart-test', {
    components: { ChartContainer },
    data: () => ({
      isLoaded: false,
      chartdata: null
    }),
    async mounted () {
      this.isLoaded = false
      try {
        const { userlist } = await fetch('https://www.mocky.io/v2/5a945fa435000074009b0e78')
        this.chartdata = userlist
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
});

export default lineChartContainer;