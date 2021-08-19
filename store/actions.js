export default {
  setEnvironment({ commit }, env) {
    commit("setEnvironment", env);
  },
  setAudiosApiBaseUrl({ commit }, url) {
    commit("setAudiosApiBaseUrl", url);
  },
  setLanguage({ commit }, lang) {
    commit("setLanguage", lang);
  },
  setRegionAndLanguage({ commit }, langRegion) {
    commit("setRegionAndLanguage", langRegion);
  },
};
