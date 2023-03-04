# demo-micronaut-server

Demo project with an REST API written with Micronaut.

Start the app with (in the root folder of the multi-project)

    ./gradlew run



## Okta setup

Create a SPA application in Okta
* Sign-in redirect URIs (also called Redirect URI(s)): http://localhost:8080/login/callback (this is a "route" in the SPA)
* Sign-out redirect URIs (also called  Post Logout Redirect URI(s)): http://localhost:8080
* Client ID that Okta generates: 0oa8kdpoqrDslugRn5d7
* OAuth2 Issuer URI: https://dev-73627270.okta.com/oauth2/default (your okta domain plus '/oauth2/default')
* Add http://localhost:8080 as a trusted CORS origin (type CORS and redirect). Menu under Security->API

Note the backend server is running on localhost:8082

## Testing the REST API when authentication is turned off
In this very small sample app there one endpoint to list, retrieve and create books.

To create a book:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"description":"The Silmarillion"}' \
  http://localhost:8082/api/v1/books

```
Update

```
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"id": "3", description":"The Silmarillion"}' \
  http://localhost:8082/api/v1/books/3

```


To list all books:

```
curl http://localhost:8082/api/v1/books
```
