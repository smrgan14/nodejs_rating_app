<template>
  <div>
    <span class="line-chart-rating">{{translations.ratings}}</span>
    <v-icon class="line-chart-icon">more_vert</v-icon>
    <br><br>
    <line-chart v-if="loaded" :data="emotionsLineChartData"
     :width="300" :height="300"></line-chart>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LineChart from './LineChart';

export default {
  name: 'RatingLineChart',
  components: {
    LineChart,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(['translations']),
    ...mapState(['emotionsLineChartData']),
  },
  async mounted() {
    this.loaded = false;
    try {
      await this.$store.state.emotionsLineChartData;
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.line-chart-rating {
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
.line-chart-icon {
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
