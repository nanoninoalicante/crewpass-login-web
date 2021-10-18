export default function ({ $axios, $config }, inject) {
  const crewpassApi = $axios.create();
  crewpassApi.setBaseURL($config.primaryApiBaseUrl);
  crewpassApi.setHeader("Api-Hash", $config.primaryApiHashKey);
  crewpassApi.setHeader("Api-Key", $config.primaryApiKey);
  crewpassApi.setHeader("Content-Type", "application/json");
  inject("crewpassApi", crewpassApi);
}
