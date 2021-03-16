<template>
  <div>
    <v-navigation-drawer width="80" absolute class="sidebar-settings" fixed>
      <v-layout justify-center class="pt-3">
      <img class="logo-image" src="../assets/sidebar_logo.png">
      </v-layout>
      <v-layout justify-center>
      <v-list>
        <v-list-tile @click="navigateTo('today')" class="pt-2">
          <v-list-tile-action>
            <v-layout justify-center>
              <div>
                <div>
                  <v-icon color="#fff">dashboard</v-icon>
                </div>
                <div class="icon-title-below">{{translations.today}}</div>
              </div>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
         <v-list-tile @click="navigateTo('report')" class="pt-2">
          <v-list-tile-action>
            <v-layout justify-center>
              <div>
                <div>
                  <v-icon color="#fff">description</v-icon>
                </div>
                <div class="icon-title-below">{{translations.reports}}</div>
              </div>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="navigateTo('settings')" class="pt-2">
          <v-list-tile-action>
            <v-layout justify-center>
              <div>
                <div>
                  <v-icon color="#fff">settings</v-icon>
                </div>
                <div class="icon-title-below">{{translations.settings}}</div>
              </div>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      </v-layout>

    </v-navigation-drawer>
<v-navigation-drawer
    :mini-variant.sync="mini"
    hide-overlay
    right
    fixed
    class="sidebar-settings-right"
  >
    <v-toolbar flat class="sidebar-toolbar-right">
      <v-list>
        <v-list-tile avatar>
           <v-list-tile-avatar>
            <img :src="userInfo.profilePicture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="user-info"> {{ userInfo.fullName }} </v-list-tile-title>
            <span class="user-info">{{ userInfo.company }}</span>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon class="user-icon">chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-action>
              <v-icon color="#fff">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="icon-title-below">
              {{translations.settings}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logOut()">
          <v-list-tile-action>
            <v-icon color="#fff">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="icon-title-below">
              {{translations.logout}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <v-container fluid>
      <v-layout align-center justify-center>
      <router-view></router-view>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import JwtDecode from 'jwt-decode';

export default {
  name: 'Sidebar',
  data() {
    return {
      route: this.$router.push('today'),
      mini: true,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'accessToken', 'translations']),
  },
  mounted() {
    this.checkAccessToken();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logOut() {
      this.$store.dispatch('logOut');
    },
    checkAccessToken() {
      const localAccessToken = localStorage.getItem('accessToken');
      if (localAccessToken != null) {
        if (this.accessToken === null) {
          this.$store.commit('setAccessToken', localAccessToken);
          const token = JwtDecode(localAccessToken);
          this.$store.commit('setUserInfo', {
            fullName: token.name,
            company: token.hd,
            profilePicture: token.picture,
          });
        }
      } else {
        this.$router.push('login');
      }
    },
  },
};
</script>

<style>
.logo-image {
  width: 40px;
  height: 40px;
}
.sidebar-settings {
  background-color: #2D3038 !important;
}
.sidebar-settings-right {
background-color: #2D3038 !important;
}
.sidebar-toolbar-right {
  background-color: #2D3038 !important;
  border-bottom: 1px solid white !important;
}
.icon-title-below {
  color: rgba(255, 255, 255, 0.5);
  font-family: Roboto;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
}
.user-image {
width: 35px;
height: 35px;
border-radius: 50%;
}
.user-icon {
  color:white !important;
}
.user-info {
  color: white;
}
</style>
