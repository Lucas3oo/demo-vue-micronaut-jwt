import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import OktaVue from "@okta/okta-vue";
import { OktaAuth } from "@okta/okta-auth-js";
import { buildHttpClient } from "@/services/HttpClient";
import { BookServicePlugin } from "@/services/BookService";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface Config {
  oktaUri: string;
  oktaClientId: string;
  backendApiUrl: string;
}

// read config from fweb root so that it can be replaced with different config depending on where this
// app is deployed. If the config is kept in .env then a new build would be needed for each stage/production site etc.
fetch(window.location.origin + "/config.json")
  .then((response) => response.json())
  .then((config: Config) => {
    const oktaClient: OktaAuth = new OktaAuth({
      issuer: `${config.oktaUri}/oauth2/default`,
      clientId: config.oktaClientId,
      redirectUri: window.location.origin + "/login/callback",
      scopes: ["openid", "profile", "email"],
    });
    // install the OktaVue plugin so that you can access Okta SDK from 'this.$auth'
    // install BookService plugin so that you can inject a BookService in components
    createApp(App)
      .use(router)
      .use(OktaVue, {
        oktaAuth: oktaClient,
        onAuthRequired: () => { },
        onAuthResume: () => { },
      })
      .use(BookServicePlugin, buildHttpClient(config.backendApiUrl, oktaClient)).mount("#app");
  });
