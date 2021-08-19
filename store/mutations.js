import ksuid from "ksuid";
export default {
  setAlert(state, alert) {
    state.alerts.push({ ...alert, id: ksuid.randomSync().string });
  },
  closeAlert(state, alert) {
    state.alerts.splice(
      state.alerts.findIndex((i) => i.id === alert.id),
      1
    );
  },
  loading(state, l) {
    state.fullPageLoading = l;
  },
  setEnvironment(state, environment) {
    state.environment = environment;
  },
  setLanguage(state, lang) {
    state.language = lang;
  },
  setRegionAndLanguage(state, langRegion = "en-es") {
    const lang = langRegion.split("-")[0];
    const region = langRegion.split("-")[1];
    state.language = lang || "en";
    state.region = region || "es";
  },
  setCommitId(state, commitId) {
    state.commitId = commitId;
  },
  setBranchId(state, branchId) {
    state.branchId = branchId;
  }
};
