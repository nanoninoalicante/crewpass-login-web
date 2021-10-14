export default function ({ $axios, store }, inject) {
  const crewpassApi = $axios.create();
  crewpassApi.setBaseURL();
  crewpassApi.setHeader("Api-Hash", )
  crewpassApi.setHeader("Api-Key", )
  crewpassApi.setHeader("Content-Type", "application/json")
  inject("crewpassApi", crewpassApi);
}
