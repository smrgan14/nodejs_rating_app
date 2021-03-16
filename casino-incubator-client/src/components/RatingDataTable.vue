<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emotionsTableData"
      hide-actions
      class="elevation-1"
      sort-icon="arrow_upward"
    >
      <template v-slot:items="props">
        <td>
          <v-layout justify-start>
          {{ props.item.name }}
          </v-layout>
          </td>
        <td>
          <v-layout justify-start>
          {{ props.item.count }}
          </v-layout>
          </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DataTable',
  data() {
    return {
      headers: [
        { text: 'Emotions', value: 'name', align: 'left' },
        { text: 'Count', value: 'count', align: 'left' },
      ],
    };
  },
  computed: {
    ...mapGetters(['emotionsTableData', 'translations']),
  },
};
</script>
<style>
.v-table {
  background-color: #2d3038 !important;
  border-radius: 5px !important;
}
</style>
