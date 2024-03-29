import colors from "vuetify/es5/util/colors";
import { config } from "dotenv";
config();
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  publicRuntimeConfig: {
    env: process.env.ENVIRONMENT,
    projectId: process.env.PROJECT_ID || "demo-web",
    commitId: process.env.COMMIT_ID || "commitid",
    branchName: process.env.BRANCH_NAME || "branchname",
    hashKey: process.env.HASH_KEY || "",
    apiHashKeySecret: process.env.HASH_KEY || "",
    primaryApiBaseUrl: process.env.PRIMARY_API_BASEURL || "",
    primaryApiKey: process.env.PRIMARY_API_KEY || "",
    firebaseApiKey: process.env.FIREBASE_API_KEY || "",
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
    crewVerifyApiBaseUrl: process.env.CREW_VERIFY_API_BASEURL || "",
    loginButtonBackgroundBaseUrl:
      process.env.BUTTON_CDN_BASE_URL ||
      "https://storage.googleapis.com/crewpass-development-loginbutton",
    version: process.env.VERSION || "mar2021",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "Crew Pass Agency Verify Crew Member",
    title: "Crew Pass Agency Verify Crew Member",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: `${process.env.BUTTON_CSS_URL}?v=${new Date().valueOf()}`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/firebase.js", mode: "client" },
    { src: "~/plugins/axios.js", mode: "client" },
    { src: "~/plugins/gtm.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/gtm"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#21add6",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  gtm: {
    id: "GTM-NCTGPKH",
    enabled: true,
  },
};
