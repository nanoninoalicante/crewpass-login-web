export default function ({ $axios, store }, inject) {
  const crewpassApi = $axios.create();
  crewpassApi.setBaseURL("https://devapi.crewpass.co.uk/v1/");
  crewpassApi.setHeader("Api-Hash", "18b45a0af18215ee1d0576ef28bb299c3ca9d033")
  crewpassApi.setHeader("Api-Key", "bc66906d04809d760afdd25c12a6b6ca2b7754d2")
  crewpassApi.setHeader("Content-Type", "application/json")
  inject("crewpassApi", crewpassApi);

  const starWarsApi = $axios.create();
  starWarsApi.setBaseURL("https://swapi.dev/api");
  inject("starWarsApi", starWarsApi);
}
