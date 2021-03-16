<template>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md10 lg10>
              <v-card height="480" color="#2D3038">
             <div class="settings-border">
              <div class="settings-position">
               <span class="settings"> {{ translations.settings }} </span>
              </div>
              <div class="settings-icon-position">
                <v-icon @click="navigateTo('today')" class="settings-icon">close</v-icon>
                </div>
              </div>
              <br>
              <br>
              <v-form v-model="isFormValid" ref="form">
                <v-container>
                    <v-layout row wrap align-center justify-center class="settings">
                   <v-flex xs12 sm12 md6 lg6>
                     <div class="emotion-flex">
                   <div class="emotions-preview">{{ translations.emotionPreview }}</div>
                  <span class="emotions">
                    <v-icon
                      class="emotion-icon"
                      large
                      dark
                      v-for="emotion in filteredEmotions"
                      :key="emotion.id"
                    >{{emotion.icon}}</v-icon>
                  </span>
                     </div>

                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <v-text-field class="text-field-settings"
                    label="Thank you message"
                    hint="Thank you message"
                    color="white"
                    v-model="message"
                    :rules="messageRules"
                    @blur="validateForm($event)"
                  ></v-text-field>
                </v-flex>
                  <v-flex xs12 sm12 md6 lg6>
                  <v-text-field class="text-field-emotions"
                    label="Number of emotion"
                    hint="Enter number from 3-5"
                    persistent-hint
                    color="white"
                    v-model.number="numberOfEmoji"
                    :rules="numberRules"
                    @blur="validateForm($event)"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <v-text-field class="text-field-settings"
                    label="Message time out"
                    hint="Can be from 0-15"
                    persistent-hint
                    color="white"
                    v-model.number="timeOut"
                    :rules="timeOutRules"
                    @blur="validateForm($event)"
                  ></v-text-field>
                </v-flex>
                </v-layout>
                </v-container>
              </v-form>
           </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import { connect, updateSettingsEmotionList } from '../utility/socket';

export default {
  name: 'Settings',
  data() {
    return {
      isFormValid: false,
      isFieldValid: false,
      messageRules: [v => !!v || 'Message is required.'],
      numberRules: [
        v => !!v || 'Number of emotions is required.',
        v => (v > 2 && v < 6) || 'Number must be from 3-5.',
      ],
      timeOutRules: [
        v => !!v || 'Message time out is required.',
        v => (v >= 0 && v <= 15) || 'Message time out must be from 0-15.',
      ],
    };
  },
  computed: {
    ...mapGetters(['filteredEmotions', 'translations']),
    ...mapState(['config']),
    message: {
      get() {
        return this.config.ratingMessage;
      },
      set(value) {
        this.isFieldValid = this.validateField();
        if (this.isFieldValid) {
          this.addRatingMessage(value);
        }
      },
    },
    timeOut: {
      get() {
        return this.config.messageTimeOut / 1000;
      },
      set(value) {
        this.isFieldValid = this.validateField();
        if (this.isFieldValid) {
          this.addMessageTimeOut(value);
        }
      },
    },
    numberOfEmoji: {
      get() {
        return this.config.numberOfEmotions;
      },
      set(value) {
        this.isFieldValid = this.validateField();
        if (this.isFieldValid) {
          this.addNumberOfEmotions(value);
        }
      },
    },
  },
  sockets: {
    connect,
    settings: updateSettingsEmotionList,
  },
  methods: {
    ...mapActions([
      'addRatingMessage',
      'addMessageTimeOut',
      'addEmotionsList',
      'addNumberOfEmotions',
      'updateConfig',
    ]),
    navigateTo(route) {
      this.$router.push(route);
    },
    validateForm(event) {
      if (this.isFormValid) {
        this.updateConfig({
          numberOfEmotions: this.numberOfEmoji,
          messageTimeOut: this.timeOut * 1000,
          ratingMessage: this.message,
        });
      }
      event.preventDefault();
    },
    validateField() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style>
.settings {
  color: rgba(255, 255, 255, 0.85);
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
  line-height: 29px;
  margin-left: 70px;
}
.settings-border {
  border-bottom: solid;
  border-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
  height: 100px;
  margin-right: 50px;
  margin-left: 50px;
  position: relative;
}
.settings-icon {
color:rgba(255, 255, 255, 0.5) !important;
}
.settings-position {
float: left;
margin-top: 30px
}
.settings-icon-position {
float:right;
margin-top: 34px
}
.emotions-preview {
  color: rgba(255, 255, 255, 0.5);
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  width: 96px;
  text-align: left;
}
.emotions {
  float:left;
  margin-top: 5px;
}
.emotion-icon {
opacity: 0.6;
}
.text-field-settings {
  margin-right:34px;
}
.text-field-settings .theme--light.v-label {
  color:rgba(255, 255, 255, 0.5);
  top:auto;
}
.text-field-settings .v-messages__message {
  color: rgba(255, 255, 255, 0.5);
}
.text-field-emotions {
  margin-left:34px;
}
.text-field-emotions .theme--light.v-label {
  color:rgba(255, 255, 255, 0.5);
  top: auto;
}
.text-field-emotions .v-messages__message {
  color: rgba(255, 255, 255, 0.5);
}
.emotion-flex {
  margin-left:34px;
}
.emotion-number {
  border-style: solid;
  border-width: 1px;
  background-color: #FFFFFF;
  border-radius: 4px;
  opacity: 0.2;
}
.settings .v-input input {
  color: rgba(255, 255, 255, 0.85) !important;
  background-color: #2D3038 !important;
  border-style: solid;
  border-width: 1px;
  border-color: #FFFFFF;
  padding: 10px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  border-radius: 4px;
}
.red {
    height: 300px;
    background: red;
    position: relative;
}

.red:before {
    content: '';
    position: absolute;
    top: 10; right: 0;
    border-top: 80px solid white;
    border-left: 80px solid red;
    width: 0;
}
</style>
