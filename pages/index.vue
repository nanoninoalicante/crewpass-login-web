<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <!--          All users statues - except Free users -->
          <v-card
            v-show="crewStatus && crewStatus !== 'Unchecked'"
            flat
            class="pa-5 ma-4 rounded-xl"
          >
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  class="py-10 my-8"
                  justify="center"
                  align="center"
                >
                  <div
                    :class="['background-repeat', 'verification-status-badge']"
                    :style="
                      'background-image: url(' + loginButtonBackground + ');'
                    "
                  ></div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                elevation="0"
                rounded
                x-large
                color="primary"
                @click="closeWindow"
                >Go back to Agency</v-btn
              >
            </v-card-actions>
          </v-card>

          <!-- FREE USER -->

          <v-card
            v-show="crewStatus && crewStatus === 'Unchecked'"
            flat
            class="pa-5 ma-4 rounded-xl"
          >
            <v-card-text>
              <v-row>
                <v-col cols="12" class="py-6">
                  <h1 class="text-subtitle-1 font-weight-bold black--text">
                    Sorry, your current CrewPass plan doesn't include this
                    feature.
                  </h1>
                </v-col>

                <v-col cols="12" class="py-6">
                  <h1 class="text-subtitle-1 font-weight-bold black--text">
                    You will need to undergo a criminal background check and
                    identity verification to be able to share your CrewPass
                    status with this agency.
                  </h1>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                elevation="0"
                rounded
                large
                color="gray"
                @click="closeWindow"
                >Go back to Agency</v-btn
              >
              <v-btn
                elevation="0"
                rounded
                large
                color="primary"
                target="_blank"
                :href="upgradeToPremiumUrl"
                >Apply now</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-show="!crewStatus" flat class="pa-5 ma-4 rounded-xl">
            <v-card-title
              class="text-subtitle-1 font-weight-bold text-sm-center"
              >Please enter your CrewPass details</v-card-title
            >
            <v-card-text>
              <v-input>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="Your Email"
                      placeholder="Your Email"
                      filled
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Your Password"
                      placeholder="Your Password"
                      type="password"
                      filled
                      dense
                      @keyup.enter="login"
                    ></v-text-field>
                  </v-col>
                  <v-col align="center" cols="12">
                    <v-btn
                      elevation="0"
                      rounded
                      large
                      color="primary"
                      :loading="fullPageLoading"
                      :disabled="fullPageLoading"
                      @click.stop="login"
                      >Verify Now</v-btn
                    >
                  </v-col>
                </v-row></v-input
              >
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12"
              ><v-sheet color="transparent" class="px-5 mx-4"
                ><h1 class="text-subtitle-1 font-weight-bold white--text">
                  Don't have CrewPass? Get a fully enhanced background check
                  anywhere in the world from £9.99p/m.
                </h1>
              </v-sheet></v-col
            >
          </v-row>
          <v-col align="center" cols="12">
            <v-btn
              elevation="0"
              rounded
              large
              color="primary"
              target="_blank"
              :href="signupLinkUrl"
              >Sign up</v-btn
            >
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import querystring from "query-string";
import * as CryptoJS from "crypto-js";
export default {
  components: {},
  metaInfo: {
    title: "Crew Pass Agency Verification",
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      user: "",
      qs: "",
      userId: "",
      popupPingInterval: "",
      upgradeToPremiumUrl:
        "https://app.crewpass.co.uk/auth/login?utm_source=agency-verify-signup-web&utm_medium=web&utm_id=crew-upgrade-to-premium-web",
      signupLinkUrl:
        "https://app.crewpass.co.uk/?utm_source=agency-verify-signup-web&utm_medium=web&utm_id=agency-verify-signup-button",
    };
  },
  computed: {
    ...mapGetters([
      "getAlerts",
      "fullPageLoading",
      "hashKey",
      "getSessionId",
      "userEmail",
      "crewStatus",
      "userFirstName",
      "userLastName",
      "crewUniqueId",
      "crewHasSubscription",
      "crewSubscriptionType",
    ]),
    loginButtonBackgroundBaseUrl() {
      return this.$config.loginButtonBackgroundBaseUrl;
    },
    crewStatusId() {
      if (!this.crewStatus) return "";
      return this.crewStatus.toLowerCase();
    },
    loginButtonBackground() {
      if (!this.crewStatus)
        return `${this.loginButtonBackgroundBaseUrl}/Start.png`;
      return `${this.loginButtonBackgroundBaseUrl}/${this.crewStatus}.png`;
    },
  },
  mounted() {
    // GET QUERY STRING DATA FROM URL
    this.qs = querystring.parse(window.location?.search);
    this.checkUser();
    // LISTEN FOR WINDOW CLOSE TO MAKE SURE A STATUS of "CLOSED" is returned
    window.addEventListener("beforeunload", this.beforeClose);
  },
  beforeDestroy() {
    if (this.popupPingInterval) {
      clearInterval(this.popupPingInterval);
    }
  },
  methods: {
    test() {
      this.popupCallback();
    },
    checkUser() {
      this.$firebase.auth().onAuthStateChanged((user) => {
        console.log("location: ", this.$route);
        if (!user) {
          console.log("user is not signed in");
          return;
        }
        user.getIdTokenResult(true).then((u) => {
          console.log("token: ", u.token);
        });
        // ...
      });
    },
    beforeClose() {
      this.popupCallback();
    },
    getVerificationStatus() {
      return this.crewStatus || "Closed";
    },
    popupCallback() {
      const verificationStatus = this.getVerificationStatus();
      console.log("popupcallback: ", verificationStatus);
      const payload = JSON.stringify({
        message: verificationStatus,
        status: verificationStatus.toLowerCase(),
        subscriptionStatus: this.crewHasSubscription
          ? "subscribed"
          : "not-subscribed",
        hasSubscription: this.crewHasSubscription,
        user: {
          email: this.userEmail,
          name: this.userFirstName + " " + this.userLastName,
          crewUniqueId: this.crewUniqueId,
          hasSubscription: this.crewHasSubscription,
        },
        formData: {
          "crewpass-crew-status": verificationStatus,
          "crewpass-crew-email": this.userEmail,
          "crewpass-crew-crewUniqueId": this.crewUniqueId,
          "crewpass-crew-name": this.userFirstName + " " + this.userLastName,
        },
      });
      if (window.opener) {
        console.log("window.opener.postMessage");
        window.opener.postMessage(payload, this.qs?.origin);
      } else {
        console.log("window.postMessage");
        window.postMessage(payload, this.qs?.origin);
      }
    },
    closeWindow() {
      window.close();
    },
    login() {
      this.$store.commit("loading", true);
      this.$firebase
        .auth()
        .setPersistence(this.$firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          const hashedPassword = CryptoJS.HmacSHA1(
            this.password,
            this.hashKey
          ).toString();
          return this.$firebase
            .auth()
            .signInWithEmailAndPassword(this.email, hashedPassword);
        })
        .then(async (userCredential) => {
          // Signed in
          this.$store.commit("loading", false);
          console.log("user creds: ", userCredential);
          this.user = userCredential.user;
          console.log("user: ", this.user);
          const token = await this.$firebase
            .auth()
            .currentUser.getIdToken(false);
          const userData = await this.$store
            .dispatch("login", token)
            .catch((e) => {
              console.log("error from api login: ", e.message);
            });
          await this.$store.dispatch("recordVerification", token);
          console.log("userdata from login: ", userData);
          this.$gtm.push({
            event: "agency-verify-login",
            email: this.user.email,
            fullName: this.user.fullName,
            status: userData.kycUserStatus,
          });
          this.popupCallback();
        })
        .catch((error) => {
          console.log("error: ", error);
          this.$store.commit("setAlert", {
            message: `Login didn't work because ${error.message}`,
            type: "error",
          });
          this.$store.commit("loading", false);
          // ..
        });
    },
  },
};
</script>
<style lang="sass">
.v-btn span.v-btn__content
  text-transform: none
  letter-spacing: 0
  font-weight: 600
.background-repeat
  background-repeat: repeat-y

.verification-status-badge
  background-position: center
  background-size: cover
  max-width: 340px
  width: 100%
  height: 40px
</style>
