import * as parse from "simple-parse-json";
import * as uuid from "uuid";
import * as CryptoJS from "crypto-js";
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
  getHashKey({ commit }, { method = "POST", uri, deviceId }) {
    const requestURL = uri.replace("/v1/dashboard", "").toString();
    const apiHashKeySecret = this.$config.apiHashKeySecret;
    const apiHashOrg =
      deviceId === ""
        ? method + " " + requestURL
        : method + " " + requestURL + " " + deviceId;
    return CryptoJS.HmacSHA1(apiHashOrg, apiHashKeySecret).toString();
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
  async getIp({ commit, dispatch }) {
    console.log("getting IP");
    const deviceData = window.localStorage.getItem("deviceData");
    if (deviceData) {
      commit("setDeviceData", parse(deviceData));
      return deviceData;
    }
    const uri = "/v1/dashboard/get/ip";
    const apiHash = await dispatch("getHashKey", { uri, deviceId: "" });
    console.log("api Hash: ", apiHash);
    this.$crewpassApi.setHeader("api-hash", apiHash);
    return this.$crewpassApi
      .post(
        uri,
        JSON.stringify({
          deviceId: "",
          language: "en",
          timeZone: "Europe/Madrid",
          userType: "",
        })
      )
      .then((r) => {
        commit("setDeviceData", r.data?.result);
        return r.data?.result;
      });
  },
  async registerDevice({ commit, dispatch }, deviceData) {
    const ip = parse(deviceData).ipAddress || "";
    const countryCode = parse(deviceData).countryCode || "n/a";
    const uri = "/v1/dashboard/device/register";
    const apiHash = await dispatch("getHashKey", { uri, deviceId: ip });
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
    this.$crewpassApi.setHeader("api-hash", apiHash);
    this.$crewpassApi.post(uri, JSON.stringify(payload)).then((r) => {
      console.log("register device: ", r.data);
    });
  },
  async login({ getters, dispatch, commit }, token) {
    const ip = getters.getIp;
    const uri = "/v1/dashboard/user/detail";
    const apiHash = await dispatch("getHashKey", { uri, deviceId: ip });
    const payload = {
      deviceId: ip,
      language: "en",
      timeZone: "Europe/Madrid",
      userType: "crew",
    };
    this.$crewpassApi.setHeader("Authorization", token);
    this.$crewpassApi.setHeader("api-hash", apiHash);
    this.$crewpassApi.post(uri, JSON.stringify(payload)).then((r) => {
      const userData = r.data?.result?.user;
      console.log("login: ", userData);
      commit("setUserData", userData);
    });
  },
};
