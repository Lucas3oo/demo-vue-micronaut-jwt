# demo-vue-micronaut-jwt

Demo project for a simple SPA app using REST-API back-end with OpenID Connect/OAuth using "Authorization Code" flow with PKCE.

The server is a Micronaut app with H2 in-memory DB.

The client is a simple Vue single page application.

The frontend handles re-direct to Okta which handles the authentication.
The frontend then passes the access token in every request to the backend which validate that against Okta.


## Okta setup

Create a developer account.

Create a SPA application in Okta
* Sign-in redirect URIs (also called Redirect URI(s)): http://localhost:8080/login/callback (this is a "route" in the SPA)
* Sign-out redirect URIs (also called  Post Logout Redirect URI(s)): http://localhost:8080
* Client ID that Okta generates: 0oa8kdpoqrDslugRn5d7
* OAuth2 Issuer URI: https://dev-73627270.okta.com/oauth2/default (your Okta domain plus '/oauth2/default')
* Add http://localhost:8080 as a trusted CORS origin (type CORS and redirect). Menu under Security->API
* For the "Authorization server" in Okta add custom claims like "myRole" which maps to user attribute "user.myRole" which has to be created using "Directory->Profile Editor" and then on the user profile. The application also has to define the attribute "myRole" and then a mapping between the user attribute in Okta and the "app user profile" needs to be created. Create two values; "admin" and "readonly" and assign some users these roles.
Create one claim for the "ID token" called "myRole" and the another called the same as an "access token" so that both frontend
and backend can use the "myRole" claim to do authorization. Since the claims are included in the access token the backend doens't have to do another call to the UserInfo endpoint at the OAuth issuer.

Note the backend server is running on localhost:8082

### Frontend
The frontend is a "OAuth client".

In frontend the OAuth2 issuer and client-id needs to be configured.
The ULR for the backend also needs to be configured in the frontend.
It is done in [config.json](./demo-vue-client/public/config.json).

### Backend
The backend is a "resource server" in OAuth terms.
In the backend the OAuth2 issuer needs to be configured applcation.yml.

In case the frontend isn't deployed in the server and instead run from a separate server
or a CDN then CORS has to be enabled in the backend.

The property 'micronaut.security.token.roles-name' in applcation.yml must match the claim name of "myRole".
The roles will then be automatically available in the principal (user) in Micronaut.

