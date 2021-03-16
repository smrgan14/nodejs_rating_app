<template>
<div class="rating-fixed">
  <v-app>
    <v-container fluid fill-height >
    <v-layout class="rating-layout" row wrap justify-center>
      <v-flex xs12 sm8 md4 lg4>
        <v-alert
          :value="notificationError"
          transition="scale-transition"
          type="error">
          {{ errorMessage }}
      </v-alert>
      </v-flex>
      <v-flex xs12 class="rating-flex">
        <img class="vote-image" src="../assets/positive-vote.png">
        <br />
        <span class="rate-service">{{translations.rateService}}</span>
      </v-flex>
      <v-flex xs12 sm5 md3 lg2 v-for="emotion in filteredEmotions" :key="emotion.id">
        <v-card
          class="mx-auto card-settings"
          :style="{ borderLeftColor: emotion.borderColor }"
          :color="emotion.color"
          dark
          width="150"
          height="125"
          @click="register('ratingMessage', emotion.id)"
        >
          <v-card-text>
            <v-icon class="emoji-icon" dark>{{ emotion.icon }}</v-icon>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </v-app>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { connect, updateSettingsConfigState } from '../utility/socket';

export default {
  name: 'Rating',
  data() {
    return {
      notificationError: false,
      timeOut: 2000,
    };
  },
  computed: mapGetters(['filteredEmotions', 'errorMessage', 'translations']),
  sockets: {
    connect,
    settings: updateSettingsConfigState,
  },
  methods: {
    async register(route, emotionId) {
      await this.$store.dispatch('registerEmotion', { id: emotionId });
      if (this.errorMessage) {
        this.notificationError = true;
        setTimeout(() => this.notificationError = false, this.timeOut);
      } else {
        this.$router.push(route);
      }
    },
  },
};

</script>

<style scoped>
@media screen and (max-width: 960px) {
  .rating-fixed { position: relative !important; }
}
.rating-fixed {
position: fixed;
right: 0;
left:0;
z-index: 1;
}
.rating-flex {
  margin: auto;
}
.rating-layout {
  max-width: 100% !important;
}
.emoji-icon {
  font-size: 60px;
  margin-top: 20px;
}
.card-settings {
  border-left: 3px solid;
  border-radius: 5px;
}
.rate-service {
  color: #a7a7aa;
  font-size: 25px;
}
.vote-image {
  width: 140px;
  height: 140px;
}
</style>
