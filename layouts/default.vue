<template>
  <v-app light>
    <FullPageLoader :loading="fullPageLoading" />
<!--    <v-app-bar fixed app> </v-app-bar>-->
    <v-main>
      <v-container fluid class="pt-10">
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
    return {
    };
  },
  computed: {
    ...mapGetters(["getAlerts", "fullPageLoading", "commitId", "branchId"]),
  },
  mounted() {
    this.$store.commit("loading", false);
    this.$store.dispatch("getIp");
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
    closeAlert(alert) {
      console.log("close alert: ", alert);
      this.$store.commit("closeAlert", alert);
      if (alert.action && alert.action === "reload") {
        window.location.reload();
      }
    },
  }
};
</script>
