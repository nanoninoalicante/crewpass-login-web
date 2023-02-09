export default function ({ $axios, $config }, inject) {
  const crewpassApi = $axios.create();
  crewpassApi.setBaseURL($config.primaryApiBaseUrl);
  crewpassApi.setHeader("Api-Key", $config.primaryApiKey);
  crewpassApi.setHeader("Content-Type", "application/json");
  inject("crewpassApi", crewpassApi);

  const demoApi = $axios.create();
  demoApi.setBaseURL("https://webhook.site/0bb20ab5-6e6c-4943-870f-9acdcad6684d");
  demoApi.setHeader("Content-Type", "application/json");
  inject("demoApi", demoApi);

  const crewVerifyApi = $axios.create();
  crewVerifyApi.setBaseURL("https://crewpass-crewverify-api-dev-feb2023-eu-ojo6h3z4mq-ez.a.run.app");
  crewVerifyApi.setHeader("Content-Type", "application/json");
  inject("crewVerifyApi", crewVerifyApi);
}
