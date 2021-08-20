<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card v-show="verifiedStatus" flat class="pa-5 ma-4 rounded-xl">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <h1 class="text-h5">{{ verifiedStatus }}</h1>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn elevation="0" rounded color="primary" @click="closeWindow"
                >Go back to Agency</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-show="!verifiedStatus" flat class="pa-5 ma-4 rounded-xl">
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text>
              <v-input>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="Email"
                      placeholder="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Password"
                      placeholder="Password"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn elevation="0" rounded color="primary" @click="login"
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
export default {
  components: {},
  metaInfo: {
    title: "Login Demo",
  },
  data() {
    return {
      email: "christopher+crew12@nanonino.com",
      password: "@Nanonino2021",
      name: "Christopher Hill",
      user: "",
      verifiedStatus: "",
      qs: ""
    };
  },
  computed: {
    ...mapGetters(["getAlerts", "fullPageLoading"]),
  },
  mounted() {
    // GET QUERY STRING DATA FROM URL
    this.qs = querystring.parse(window.location?.search);
    // LISTEN FOR WINDOW CLOSE TO MAKE SURE A STATUS of "CLOSED" is returned
    window.addEventListener("beforeunload", this.beforeClose);
  },
  methods: {
    beforeClose(){
      this.popupCallback();
    },
    popupCallback() {
      console.log("popupcallback");
      const verificationStatus = this.verifiedStatus || "Closed";
      window.opener.postMessage(JSON.stringify({
        message: verificationStatus,
        status: verificationStatus.toLowerCase(),
        subscriptionStatus: "subscribed",
        user: {
          email: this.email,
          name: this.name
        }
      }), this.qs?.origin);
    },
    closeWindow() {
      window.close();
    },
    login() {
      this.$store.commit("loading", true);
      window.firebase
        .auth()
        .setPersistence(window.firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return window.firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
        })
        .then((userCredential) => {
          // Signed in
          this.$store.commit("loading", false);
          this.user = userCredential.user;
          console.log("user: ", this.user);
          // TO SIMULATE GETTING BACKGROUND CHECK STATUS
          this.verifiedStatus = "Verified";
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
