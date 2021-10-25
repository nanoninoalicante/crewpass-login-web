<template>
  <v-app light style="background-image: url('login_backgrounds.png')">
    <FullPageLoader :loading="fullPageLoading" />
    <v-main>
      <v-container fluid class="pt-10">
        <v-container fluid class="pt-2">
          <v-row align="center">
            <v-col cols="12" align="center">
              <v-img src="CP_white.png" width="115px" height="auto"></v-img>
            </v-col>
          </v-row>
        </v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app color="transparent" fixed>
      <v-alert
        v-for="alert in getAlerts"
        :key="alert.id"
        border="left"
        close-text="Close Alert"
        :type="alert.type"
        dark
        width="100%"
      >
        <v-row align="center">
          <v-col class="grow">{{ alert.text || alert.message }}</v-col>
          <v-col class="shrink">
            <v-btn rounded large @click="closeAlert(alert)">Ok</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import FullPageLoader from "@/components/FullPageLoader";
export default {
  components: {
    FullPageLoader,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getAlerts", "fullPageLoading", "commitId", "branchId"]),
  },
  mounted() {
    this.startSession().then((r) => {
      console.log("session started");
    });
  },
  beforeCreate() {
    console.log("env: ", this.$config.env);
    console.log("commitId: ", this.$config.commitId);
    console.log("branchName: ", this.$config.branchName);
    this.$store.commit("setCommitId", this.$config.commitId || "commitId");
    this.$store.commit("setBranchId", this.$config.branchName || "branchName");
    this.$store.commit("setHashKey", this.$config.hashKey || "");
    this.$store.dispatch("setEnvironment", this.$config.env || "dev");
    // this.$store.dispatch("setVersion", this.$config.version || "mar2021");
    this.$store.dispatch("setRegionAndLanguage", "en-en");
  },
  methods: {
    checkUser() {
      this.$firebase.auth().onAuthStateChanged((user) => {
        console.log("location: ", this.$route);
        if (!user) {
          console.log("user is not signed in");
          return;
        }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        user.getIdTokenResult(true).then((u) => {
          console.log("token: ", u.token);
        });
        // ...
      });
    },
    closeAlert(alert) {
      console.log("close alert: ", alert);
      this.$store.commit("closeAlert", alert);
      if (alert.action && alert.action === "reload") {
        window.location.reload();
      }
    },
    async startSession() {
      await this.$store.dispatch("setSession");
      await this.$store.commit("loading", false);
      const deviceData = await this.$store.dispatch("getIp");
      return await this.$store.dispatch("registerDevice", deviceData);
    },
  },
};
</script>
