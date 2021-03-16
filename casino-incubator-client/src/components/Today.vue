<template>
  <v-container class="report-container" grid-list-md fluid>
    <v-layout class="report-layout" row wrap>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card flat class="rating-info" dark color="#1B1E24" height="350">
          <rating-info></rating-info>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md9 lg9 xl9>
        <v-card class="card-position" dark color="#2D3038" height="370">
          <rating-line-chart></rating-line-chart>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md3 lg3 xl3>
        <v-card class="report-pie-chart" dark color="#2D3038" height="370">
          <rating-pie-chart></rating-pie-chart>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md5 lg5 xl5>
        <v-card class="card-position" dark color="#2D3038" height="200">
          <rating-data-table></rating-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RatingDataTable from './RatingDataTable';
import RatingInfo from './RatingInfo';
import RatingPieChart from './RatingPieChart';
import RatingLineChart from './RatingLineChart';

export default {
  name: 'Today',
  components: {
    RatingDataTable,
    RatingInfo,
    RatingPieChart,
    RatingLineChart,
  },
  mounted() {
    this.$store.dispatch('getRatingsReport');
  },
};
</script>

<style>
.report-container {
  margin-top: -40px !important;
}
</style>
