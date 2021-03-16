<template>
 <div class="rating-message">
    <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12 lg12>
            <div>
            <v-btn flat icon color="blue lighten-2">
              <v-icon class="check-icon" x-large>check_circle</v-icon>
            </v-btn>
            <br>
            <br>
            <span class="rate-message">{{ ratingMessage }}</span>
          </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RatingMessage',
  computed: mapGetters(['ratingMessage', 'messageTimeOut']),
  mounted() {
    setTimeout(() => this.$router.push('home'), this.messageTimeOut);
  },
};
</script>

<style scoped>
.rating-message {
  position: fixed;
  right: 0;
  left:0;
}
.rate-message {
  color: #FFFFFF;
  font-family: Roboto;
  font-size: 26px;
  font-weight: 350;
  line-height: 38px;
  text-align: center;
}
.check-icon {
  font-size: 50px !important;
}
</style>
