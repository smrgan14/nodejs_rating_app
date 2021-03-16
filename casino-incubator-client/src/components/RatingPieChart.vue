<template>
  <div class="">
    <span class="pie-chart-rating">{{translations.ratings}}</span>
    <v-icon class="pie-chart-icon">more_vert</v-icon>
    <br><br>
    <pie-chart v-if="loaded" :data="emotionsPieChartData"></pie-chart>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PieChart from './PieChart';

export default {
  name: 'RatingPieChart',
  components: {
    PieChart,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['translations']),
    ...mapState(['emotionsPieChartData']),
  },
  async mounted() {
    this.loaded = false;
    try {
      await this.$store.state.emotionsPieChartData;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.pie-chart {
  max-width: 300px;
  margin: auto;
}
.pie-chart-rating {
  float: left;
  margin-left: 27px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-family: Roboto;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
}
.pie-chart-icon {
 float: right;
  margin-right: 25px;
  margin-top: 10px;
  font-size: 20px;
  background-color: #FFFFFF;
  opacity: 0.6;
  width: 0px;
  height: 20px;
}
</style>
