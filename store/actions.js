import * as parse from "simple-parse-json";
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
  getIp({ commit }) {
    const deviceData = window.localStorage.getItem("deviceData");
    if(deviceData) {
      commit("setDeviceData", parse(deviceData));
      return deviceData;
    }
    this.$crewpassApi
      .post(
        "/dashboard/get/ip",
        JSON.stringify({
          "deviceId": "",
          "language": "en",
          "timeZone": "Europe/Madrid",
          "userType": ""
        })
      )
      .then((r) => {
        commit("setDeviceData", r.data?.result);
      });
  },
  registerDevice({commit}){
    const deviceData = window.localStorage.getItem("deviceData");
    const ip = parse(deviceData).ipAddress || "";
    this.$crewpassApi
      .post(
        "/dashboard/get/ip",
        JSON.stringify({
          "deviceId": ip,
          "language": "en",
          "timeZone": "Europe/Madrid",
          "userType": ""
        })
      )
      .then((r) => {
        console.log("register device: ", r.data)
      });
  }
};
