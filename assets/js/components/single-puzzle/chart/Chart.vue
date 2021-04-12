<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    isLoaded: Boolean,
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
  },
  mounted () {
    this.renderChart(this.chartdata, this.options);
  }
}
</script>