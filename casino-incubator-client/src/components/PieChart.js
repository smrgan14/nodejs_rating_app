import { Pie, mixins } from 'vue-chartjs';
import ChartJsPluginLabels from 'chartjs-plugin-labels';

export default {
  extends: Pie,
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: 'rgba(255, 255, 255, 0.95)',
            fontSize: 10,
            boxWidth: 12,
          },
        },
        plugins: {
          labels: {
            render: 'value',
            fontSize: 13,
            fontColor: '#fffff',
          },
        },
      },
    };
  },
  components: {
    ChartJsPluginLabels,
  },
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'data'],
  watch: {
    data() {
      this.renderChart(this.data, this.options);
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
