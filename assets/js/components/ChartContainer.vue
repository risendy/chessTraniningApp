<template>
  <div class="container" :width="300" :height="300">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from './Chart.vue'
import "babel-core/register";
import "babel-polyfill";

export default {
  name: "LineChartContainer",
  components: { 
     LineChart 
  },
  data: () => ({
    loaded: false,
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      maintainAspectRatio: false,
      default: null
    }
  }),
  async mounted () {
    this.loaded = false
    try {
      const { userlist } = await fetch('https://www.mocky.io/v2/5a945fa435000074009b0e78')
      this.chartdata = {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    };
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>