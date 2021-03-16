<template>
<div class="login-fixed">
  <v-app id="">
    <v-content>
      <v-container fluid fill-height class="login-settings">
        <v-layout align-center justify-center class="login-layout">
          <v-flex xs12 sm8 md5 lg5>
            <v-card class="elevation-12">
              <v-toolbar color="blue-grey darken-3">
                <v-container fluid>
                  <v-layout justify-center align-center>
                  <div class="welcome">
                    <span class="welcome-rating">Welcome to rating app</span>
                  </div>
                </v-layout>
                <v-spacer></v-spacer>
                </v-container>
               </v-toolbar>
              <v-card-text>
               <img class="welcome-image" src="@/assets/rating-app.jpg">
              </v-card-text>
              <v-card-actions class="action-settings">
                <v-spacer></v-spacer>
                <v-flex xs12 sm12 md12 lg12>
                 <button class="login-btn login-btn--google"
                 @click="handleClickGetAuth()">
                   Login with Google
                 </button>
                  <button class="login-btn login-btn--google"
                  @click="navigateGoogleSignIn()">
                   Create Google account
                 </button>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>

export default {
  name: 'Login',
  methods: {
    handleClickGetAuth() {
      this.$gAuth.getAuthCode()
        .then((authCode) => {
          this.$store.dispatch('getGoogleAccesToken', authCode);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    navigateTo() {
      this.$router.push('sidebar');
    },
    navigateGoogleSignIn() {
      window.open('https://accounts.google.com/SignUp?service=mail&continue=https://mail.google.com/mail/?pc=topnav-about-n-en', '_blank');
    },
  },
};
</script>

<style>
.welcome {
  margin-top: -13px;
}
.welcome-image {
  width: 450px;
}
.welcome-rating {
  color: #ffffff;
  font-family: Roboto;
  font-size: 30px;
  font-weight: 600;
  line-height: 46px;
  opacity: 0.69;
}
.login-settings {
background-color: #1b1e24 !important;
}
.login-fixed {
position: fixed;
right: 0;
left:0;
z-index: 1;
}
.action-settings {
background-color: #37474f !important;
text-align: center;
}
.login-btn {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 13px;
  color: #FFF;

}
.login-btn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.login-btn:focus {
  outline: none;
}
.login-btn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}
.login-btn--google {
  background: #DD4B39 !important;
}
.login-btn--google:before {
  border-right: #BB3F30 1px solid !important;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.login-btn--google:hover,
.login-btn--google:focus {
  background: #E74B37;
}
</style>
