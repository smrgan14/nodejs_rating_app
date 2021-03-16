import { Line, mixins } from 'vue-chartjs';
import { mapState } from 'vuex';
import { find, each } from 'lodash';

export default {
  extends: Line,
  data() {
    return {
      gradientHappy: null,
      gradientSatisfied: null,
      gradientMeh: null,
      gradientDissatisfied: null,
      gradientSad: null,
      gradientList: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 25,
            right: 0,
            top: 50,
            bottom: 0,
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            fontColor: 'rgba(255, 255, 255, 0.5)',
            fontSize: 10,
            boxWidth: 12,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.5)',
              fontSize: 10,
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderDash: [2.5],
              lineWidth: 1,
              drawBorder: false,
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.5)',
              fontSize: 10,
            },
            gridLines: {
              display: false,
            },
          }],
        },
      },
    };
  },
  props: ['chartData', 'data'],
  mixins: [mixins.reactiveProp],
  watch: {
    data() {
      this.getGradientColors();
      this.renderChart(this.data, this.options);
    },
  },
  computed: {
    ...mapState(['emotionsLineChartData']),
  },
  methods: {
    getGradientColors() {
      this.gradientHappy = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
      this.gradientSatisfied = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
      this.gradientMeh = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
      this.gradientDissatisfied = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
      this.gradientSad = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);

      this.gradientHappy.addColorStop(
        0, 'rgba(0, 128, 0, 0.5)',
        0.5, 'rgba(0, 128, 0, 0.25)',
        1, 'rgba(0, 128, 0, 0)',
      );

      this.gradientSatisfied.addColorStop(
        0, 'rgba(0, 255, 255, 0.9)',
        0.5, 'rgba(0, 255, 255, 0.25)',
        1, 'rgba(0, 255, 255, 0)',
      );

      this.gradientMeh.addColorStop(
        0, 'rgba(192, 192, 192, 0.7)',
        0.5, 'rgba(192, 192, 192, 0.4)',
        1, 'rgba(192, 192, 192, 0.2)',
      );


      this.gradientDissatisfied.addColorStop(
        0, 'rgba(255, 165, 0, 0.7)',
        0.5, 'rgba(255, 165, 0, 0.25)',
        1, 'rgba(255, 165, 0, 0.0)',
      );

      this.gradientSad.addColorStop(
        0, 'rgba(255, 0, 0, 0.9)',
        0.5, 'rgba(255, 0, 0, 0.25)',
        1, 'rgba(255, 0, 0, 0.0)',
      );

      this.gradientList = [
        { status: 'Happy', backgroundColor: this.gradientHappy },
        { status: 'Satisfied', backgroundColor: this.gradientSatisfied },
        { status: 'Meh', backgroundColor: this.gradientMeh },
        { status: 'Dissatisfied', backgroundColor: this.gradientDissatisfied },
        { status: 'Sad', backgroundColor: this.gradientSad },
      ];
      each(this.emotionsLineChartData.datasets, (item, index) => {
        const setting = find(this.gradientList, gradient => gradient.status === item.label);
        this.emotionsLineChartData.datasets[index].backgroundColor = setting.backgroundColor;
      });
    },
  },
  mounted() {
    this.getGradientColors();
    this.renderChart(
      {
        labels: this.emotionsLineChartData.labels,
        datasets: this.emotionsLineChartData.datasets,
      },
      this.options,
    );
  },
};
