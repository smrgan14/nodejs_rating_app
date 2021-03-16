import Vue from 'vue';
import Vuetify from 'vuetify';
import GAuth from 'vue-google-oauth2';
import VueSocketIO from 'vue-socket.io';
import App from './App';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

const gauthOption = {
  clientId: '476852557026-fa37m593esc7g0f9kv88958u8re1l8t0.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/userinfo.profile',
};

Vue.use(GAuth, gauthOption);

Vue.use(new VueSocketIO({
  connection: process.env.VUE_APP_SOCKET_URL,
}));

Vue.use(Vuetify, {
  iconfont: 'mdi',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
