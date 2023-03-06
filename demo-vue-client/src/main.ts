import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import OktaVue from "@okta/okta-vue";
import type { OktaVueOptions } from "@okta/okta-vue";
import { OktaAuth } from "@okta/okta-auth-js";
import { httpClient, createInterceptors } from "@/services/HttpClient";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const yourOktaUri = "https://dev-73627270.okta.com";
const clientId = "0oa8kdpoqrDslugRn5d7";

const oktaClient: OktaAuth = new OktaAuth({
  issuer: `${yourOktaUri}/oauth2/default`,
  clientId: clientId,
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
});

const options: OktaVueOptions = {
  oktaAuth: oktaClient,
  onAuthRequired: () => {},
  onAuthResume: () => {},
};

createInterceptors(httpClient, oktaClient);

// install the OktaVue plugin so that you can access Okta SDK from 'this.$auth'
createApp(App).use(router).use(OktaVue, options).mount("#app");
