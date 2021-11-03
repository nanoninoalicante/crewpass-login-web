<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card v-show="crewStatus" flat class="pa-5 ma-4 rounded-xl">
            <v-card-text>
              <v-row>
                <v-col cols="12" class="py-10 my-8">
                  <div id="cp-login-wrapper">
                    <div
                      id="cp-login"
                      :class="['background-repeat']"
                      :style="
                        'background-image: url(' +
                        loginButtonBackground +
                        '); width: 330px; height: 41px;'
                      "
                    ></div>
                  </div>
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
          <v-card v-show="!crewStatus" flat class="pa-5 ma-4 rounded-xl">
            <v-card-title class="text-h6 text-sm-center"
              >Approve with CrewPass</v-card-title
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
                  <v-col cols="12">
                    <v-btn
                      elevation="0"
                      rounded
                      x-large
                      color="primary"
                      @click.stop="login"
                      >Login</v-btn
                    >
                  </v-col>
                </v-row></v-input
              >
            </v-card-text>
          </v-card>
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
    title: "Login Demo",
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
    popupCallback() {
      console.log("popupcallback");
      const verificationStatus = this.crewStatus || "Closed";
      window.opener.postMessage(
        JSON.stringify({
          message: verificationStatus,
          status: verificationStatus.toLowerCase(),
          subscriptionStatus: "subscribed",
          user: {
            email: this.userEmail,
            name: this.userFirstName + " " + this.userLastName,
            crewUniqueId: this.crewUniqueId,
          },
        }),
        this.qs?.origin
      );
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
          await this.$store.dispatch("login", token).catch((e) => {
            console.log("error from api login: ", e.message);
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
.background-repeat
  background-repeat: repeat-y
</style>
