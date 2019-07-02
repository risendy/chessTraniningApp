<template>
  <center>
  <div class="container">
    <line-chart :width=800 :height=400
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
  </center>
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
      maintainAspectRatio: true,
      responsive: false,
      default: null
    }
  }),
  async mounted () {
    this.loaded = false
    try {
      var userRankingHistory = await fetch(Routing.generate('api_get_user_history_ranking', {id: 3} ));
      var historyJson = await userRankingHistory.json();

      this.chartdata = {
      labels: historyJson.label,
      datasets: [
        {
          label: 'User ranking',
          backgroundColor: '#f87979',
          data: historyJson.data,
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