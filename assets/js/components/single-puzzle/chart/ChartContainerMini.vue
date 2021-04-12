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
    import store from '../../../store/store.js';
    import * as ajaxFunc from '../../../modules/ajaxCalls.js';
    import "babel-core/register";
    import "babel-polyfill";

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
        computed: {
          rerenderGraph() {
              return store.state.rerenderGraph
          }
        },
        watch: {
          rerenderGraph: {
            deep: true,
            async handler(flag) {
              if (flag) {
                await this.forceRerender();
                store.state.rerenderGraph = false;
              }
            }
          }
        },
        methods: {
            async forceRerender() {
                this.loaded = false;
                try {
                    var newData = await ajaxFunc.fetchNewDataForGraph();
                    this.chartdata = prepareNewChartData(newData);
                    this.loaded = true
                } catch (e) {
                    console.error(e)
                }
            }
        },
        async mounted () {
            this.loaded = false;
            try {
                var newData = await ajaxFunc.fetchNewDataForGraph();
                this.chartdata = prepareNewChartData(newData);
                this.loaded = true
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>
