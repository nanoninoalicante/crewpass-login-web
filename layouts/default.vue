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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    ...mapGetters(["getAlerts", "fullPageLoading", "commitId", "branchId"]),
  },
  mounted() {
    this.$store.commit("loading", false);
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
