export default {
  getAlerts: (state) => {
    return state.alerts || [];
  },
  fullPageLoading: (state) => state.fullPageLoading,
  getSessionId: (state) => state.session,
  commitId: (state) =>
    state.commitId ? state.commitId.slice(0, 7) : "commitId",
  branchId: (state) => state.branchId || "branchId",
  environment: (state) => state.environment || "dev",
  pageTitle: (state) => `Verify with CrewPass`,
  language: (state) => state.language || "en",
  region: (state) => state.region || "es",
  hashKey: (state) => state.hashKey || "",
  getIp: (state) => state.ip || "",
  crewStatus: (state) => {
    const statuses = {
      "not-checked": {
        buttonText: "Approve With CrewPass",
      },
      loading: {
        buttonText: "Loading",
      },
      pending: {
        buttonText: "Pending",
      },
      verified: {
        buttonText: "Approved",
      },
      declined: {
        buttonText: "Declined",
      },
      unchecked: {
        buttonText: "Unchecked",
      },
    };
    if(!state.crewVerification) return "";
    return statuses[state.crewVerification]?.buttonText || "Pending";
  },
  crewStatusDisplay: (state) => (state.crewStatus || null),
  userEmail: (state) => state.userEmail || "",
  userFirstName: (state) => state.userFirstName || "",
  userLastName: (state) => state.userLastName || "",
  userId: (state) => state.userId || "",
  crewUniqueId: (state) => state.crewUniqueId || "",
};
