export default {
  getAlerts: (state) => {
    return state.alerts || [];
  },
  fullPageLoading: (state) => state.fullPageLoading,
  commitId: (state) =>
    state.commitId ? state.commitId.slice(0, 7) : "commitId",
  branchId: (state) => state.branchId || "branchId",
  environment: (state) => state.environment || "dev",
  pageTitle: (state) => `Urlo Demo - ${state.environment || "dev"}`,
  language: (state) => state.language || "en",
  region: (state) => state.region || "es",
  hashKey: (state) => state.hashKey || "",
  primaryApiKey: (state) => state.primaryApiKey || "",
  primaryApiHashKey: (state) => state.primaryApiHashKey || "",
  primaryApiBaseUrl: (state) => state.primaryApiBaseUrl || "",
};
