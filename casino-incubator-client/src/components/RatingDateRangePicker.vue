<template>
  <v-layout row wrap class="data-picker-layout">
    <v-flex xs12 sm5 md4 lg2 class="report-date">
      <v-dialog
        ref="dialogFrom"
        v-model="modalFrom"
        :return-value.sync="dateFrom"
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateFrom"
            label="Select date from:"
            prepend-icon="event"
            class="date-picker"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
        v-model="dateFrom"
        scrollable
        color="#006BF5"
        header-color="#2D3038"
        :events="eventsList"
        event-color="#006BF5"
         >
          <v-spacer></v-spacer>
          <v-btn flat color="#2D3038" @click="modalFrom = false">Cancel</v-btn>
          <v-btn flat color="#2D3038" @click="setDateFrom(dateFrom)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 sm5 md4 lg2 class="report-date">
      <v-dialog
        ref="dialogTo"
        v-model="modalTo"
        :return-value.sync="dateTo"
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateTo"
            label="Select date to:"
            prepend-icon="event"
            class="date-picker"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
         v-model="dateTo"
         scrollable
         color="#006BF5"
         header-color="#2D3038"
         :events="eventsList"
         event-color="#006BF5"
         >
          <v-spacer></v-spacer>
          <v-btn flat color="#2D3038" @click="modalTo = false">{{translations.cancel}}</v-btn>
          <v-btn flat color="#2D3038" @click="setDateTo(dateTo)">{{translations.ok}}</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { moment } from '../utility';

export default {
  name: 'RatingDateRangePicker',
  data() {
    return {
      eventsList: null,
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      modalFrom: false,
      modalTo: false,
    };
  },
  computed: {
    ...mapGetters(['translations']),
  },
  methods: {
    setDateFrom(date) {
      this.dateFrom = date;
      this.$refs.dialogFrom.save(date);
      this.modalFrom = false;
      if (this.dateFrom && this.dateTo) {
        const timeZoneOffset = moment().utcOffset() / 60;
        this.$store.dispatch('getRatingsReport', {
          dateFrom: moment(this.dateFrom).toISOString(),
          dateTo: moment(this.dateTo).toISOString(),
          tzOffset: timeZoneOffset,
        });
      }
    },
    setDateTo(date) {
      this.dateTo = date;
      this.$refs.dialogTo.save(date);
      this.modalTo = false;
      if (this.dateFrom && this.dateTo) {
        const timeZoneOffset = moment().utcOffset() / 60;
        this.$store.dispatch('getRatingsReport', {
          dateFrom: moment(this.dateFrom).toISOString(),
          dateTo: moment(this.dateTo).toISOString(),
          tzOffset: timeZoneOffset,
        });
      }
    },
  },
  mounted() {
    this.eventsList = [...Array(1)].map(() => {
      const date = new Date().toISOString().substr(0, 10);
      return date;
    });
  },
};
</script>

<style>
.date-picker .theme--light.v-icon {
  color: rgba(255, 255, 255, 0.75) !important;
}
.date-picker .theme--light.v-label {
  color: rgba(255, 255, 255, 0.75) !important;
  font-size: 14px;
  padding-left: 5px;
}
.v-date-picker-title__date {
  color: rgba(255, 255, 255, 0.85);
  font-size: 30px !important;
  text-align: center !important;
  font-weight: 400 !important;
}
.v-date-picker-table {
   background-color:#2D3038;
}
.v-date-picker-table th {
  color:#006BF5 !important;
}
.v-date-picker-table .v-btn {
  color: rgba(255, 255, 255, 0.85) !important;
}
.v-date-picker-header {
background-color:#2D3038;
}
.v-date-picker-header__value button {
  color: rgba(255, 255, 255, 0.85) !important;
}
.v-card__actions {
background-color: #2D3038;
}
.theme--light.v-btn {
  color: rgba(255, 255, 255, 0.85) !important;
}
.data-picker-layout .v-input input {
    color: rgba(255, 255, 255, 0.75) !important;
    border-style: solid;
    font-size: 15px;
    border-width: 1px;
    border-color:rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    padding: 5px;
}
</style>
