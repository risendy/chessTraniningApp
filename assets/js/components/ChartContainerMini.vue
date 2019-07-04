<template>
  <center>
  <div class="container">
    <line-chart
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

var fetchNewData = async function () {
  var userRankingHistory = await fetch(Routing.generate('api_get_user_history_ranking', {id: 3} ));
  var historyJson = await userRankingHistory.json();

  return historyJson;
};

var prepareNewChartData = function(newData) {
  return {
    labels: newData.label,
    legend: {
      display: false
    },
    datasets: [
      {
        label: 'User ranking',
        backgroundColor: '#f87979',
        data: newData.data,
      }
    ]
  };
};

export default {
  name: "LineChartContainerMini",
  components: { 
     LineChart 
  },
  data: () => ({
    test:1,
    loaded: false,
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      maintainAspectRatio: false,
      responsive: true,
      default: null,
      legend: {
        display:false
      },
      scales:{
        xAxes: [{
          display: false //this will remove all the x-axis grid lines
        }]
      }
    }
  }),
  methods: {
    async forceRerender() {
      this.loaded = false
      try {
        var newData = await fetchNewData();
        this.chartdata = prepareNewChartData(newData);
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  },
  async mounted () {
    this.loaded = false
    try {
      var newData = await fetchNewData();
      this.chartdata = prepareNewChartData(newData);
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>