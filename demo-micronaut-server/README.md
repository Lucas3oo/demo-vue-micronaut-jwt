# demo-micronaut-server

Demo project with an REST API written with Micronaut.

Start the app with (in the root folder of the multi-project)

    ./gradlew run

## Testing the REST API
In this very small sample app there one endpoint to list, retrieve and create books.

To create a book:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"description":"The Silmarillion"}' \
  http://localhost:8080/api/v1/books

```
Update

```
curl --header "Content-Type: application/json" \
  --request PUT \
  --data '{"id": "3", description":"The Silmarillion"}' \
  http://localhost:8080/api/v1/books/3

```


To list all books:

```
curl http://localhost:8080/api/v1/books
```
