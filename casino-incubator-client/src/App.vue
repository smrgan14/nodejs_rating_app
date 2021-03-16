<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: mapGetters(['accessToken']),
  mounted() {
    this.getConfiguration();
    this.checkAccessToken();
  },
  methods: {
    getConfiguration() {
      this.$store.dispatch('getConfiguration');
    },
    checkAccessToken() {
      if (this.accessToken === null) {
        const localAccessToken = localStorage.getItem('accessToken');
        this.$store.commit('setAccessToken', localAccessToken);
      }
    },

  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1b1e24;
}
</style>
