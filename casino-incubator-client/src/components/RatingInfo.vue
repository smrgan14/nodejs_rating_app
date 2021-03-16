 <template>
  <div>
    <v-layout row flex>
      <v-flex xs12 sm12 md5 lg5 class="info-rating-flex">
        <span class="info-rating">{{translations.todayCheck}}</span>
        <span
          class="info-graph"
        >{{translations.graphs}}
        </span>
      </v-flex>
      <v-flex xs12 sm12 md8 lg8 class="rating-image">
        <div class="artwork">
          <div class="artwork-background"></div>
        <img class="artwork-image" src="../assets/artwork.png">
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RatingInfo',
  computed: {
    ...mapGetters(['translations']),
  },
};
</script>

<style>
.artwork {
  position: relative;
}
.artwork .artwork-image {
  width: 500px;
  position: center;
}
.artwork .artwork-background {
  background-image: linear-gradient(250.53deg, rgba(238, 238, 238, 0) 0%,#D8D8D8 100%);
  border-radius: 100%;
  position: absolute;
  width: 760.11px;
  height: 673.82px;
  margin-top:-240px;
  margin-left: 50px;
  opacity: 0.09;
}
.info-rating-flex {
  margin-top: 38px;
  margin-left: 75px;
}
.info-rating {
  float: left;
  color: #ffffff;
  font-family: Roboto;
  font-size: 38px;
  font-weight: 900;
  line-height: 46px;
  text-align: left;
  opacity: 0.7;
}
.info-graph {
  float: left;
  color: rgba(255, 255, 255, 0.6);
  font-family: Roboto;
  font-size: 14px;
  font-weight: 350;
  line-height: 24px;
  text-align: left;
  margin-top: 25px;
}
</style>
