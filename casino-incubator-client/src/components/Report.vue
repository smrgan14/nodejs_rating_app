<template>
  <v-container class="report-container" grid-list-md fluid>
    <div class="date-picker-position">
     <rating-date-range-picker></rating-date-range-picker>
    </div>
    <v-layout class="report-layout" row wrap>
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
import RatingPieChart from './RatingPieChart';
import RatingLineChart from './RatingLineChart';
import RatingDateRangePicker from './RatingDateRangePicker';

export default {
  name: 'Report',
  components: {
    RatingDataTable,
    RatingPieChart,
    RatingLineChart,
    RatingDateRangePicker,
  },
};
</script>

<style>
@media screen and (max-width: 2560px) {
  #pie-chart {
    max-width: 300px !important;
    margin:auto;
  }
}
@media screen and (min-width: 1920px) {
 .artwork-background{ width: 1000px !important; }
}
@media screen and (max-width: 1500px) {
  .welcome-image { width: 400px; }
}
@media screen and (max-width: 1400px) {
  .artwork-background { margin-left: 10px; }
}
@media screen and (max-width: 1250px) {
  .artwork-background { display:none; }
  .welcome-image { width: 400px; }
}
@media screen and (max-width: 1250px) {
  .welcome-image { width: 360px; }
}
@media screen and (max-width: 960px) {
  .report-layout {
    display: inline-block !important;
    width: 100% !important;
  }
  .report-pie-chart { margin-right: auto !important; }
  .artwork-image { width: 345px !important; }
  .card-position { margin-left: auto !important; }
  .date-picker-position {
    margin-left: auto !important;
    margin-top: 20px;
  }
  .emotion-flex { margin-left:0 !important; }
  .text-field-emotions { margin-left:0 !important; }
  .text-field-settings { margin-right:0 !important; }
  .settings { margin-left: 0 !important }
  .settings-border {
  margin-right: 20px !important;
  margin-left: 20px !important;
}
}
@media screen and (max-width: 720px) {
  .rating-image { display: none; }
  .welcome-image { width: 350px; }
  .rating-info { height: 245px !important; }
}
@media screen and (max-width: 600px) {
  .info-rating-flex {
  margin-top: 25px !important;
  margin-left: 25px !important;
}
.info-rating { font-size: 25px !important; }
.welcome-rating { font-size: 25px; }
.welcome-image { width: 300px; }
}
@media screen and (max-width: 410px) {
.welcome-image { width: 200px; }
.welcome-rating { line-height: 22px; }
}
.card-position {
  margin-left: 50px;
  border-radius: 5px !important;
}
.date-picker-position {
  margin-left: 50px;
}
.report-pie-chart {
  margin-right: 50px;
  border-radius: 5px !important;
}

</style>
