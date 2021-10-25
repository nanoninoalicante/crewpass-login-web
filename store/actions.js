import * as parse from "simple-parse-json";
import * as uuid from "uuid";
export default {
  setSession({ commit }) {
    let token = window.localStorage.getItem("cp-session");
    if (!token) {
      token = uuid.v4();
      window.localStorage.setItem("cp-session", token);
    }
    commit("setSession", token);
  },
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
  demoApi({ commit }) {
    console.log("getting demo IP");
    return this.$demoApi
      .post(
        "/",
        JSON.stringify({
          deviceId: "",
          language: "en",
          timeZone: "Europe/Madrid",
          userType: "crew",
        })
      )
      .then((r) => {
        console.log("response: ", r);
        return r.data?.result;
      });
  },
  getIp({ commit }) {
    console.log("getting IP");
    const deviceData = window.localStorage.getItem("deviceData");
    if (deviceData) {
      commit("setDeviceData", parse(deviceData));
      return deviceData;
    }
    return this.$crewpassApi
      .post(
        "/dashboard/get/ip",
        JSON.stringify({
          deviceId: "",
          language: "en",
          timeZone: "Europe/Madrid",
          userType: "crew",
        })
      )
      .then((r) => {
        commit("setDeviceData", r.data?.result);
        return r.data?.result;
      });
  },
  registerDevice({ commit }, deviceData) {
    const ip = parse(deviceData).ipAddress || "";
    const countryCode = parse(deviceData).countryCode || "n/a";
    const payload = {
      appVersion: "1.0.0",
      countryCode,
      deviceId: ip,
      language: "en",
      timeZone: "Europe/Madrid",
      deviceName: navigator.userAgent || "web",
      userType: "",
      platform: "web",
    };
    this.$crewpassApi
      .post("/dashboard/device/register", JSON.stringify(payload))
      .then((r) => {
        console.log("register device: ", r.data);
      });
  },
  login({ getters }, token) {
    const ip = getters.getIp;
    const payload = {
      deviceId: ip,
      language: "en",
      timeZone: "Europe/Madrid",
      userType: "crew",
    };
    this.$crewpassApi.setHeader("Authorization", token);
    this.$crewpassApi
      .post("/dashboard/user/detail", JSON.stringify(payload))
      .then((r) => {
        console.log("login: ", r.data);
      });
  },
};
