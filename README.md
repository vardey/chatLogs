# Setup
Required - NodeJs

1. Clone the repo
2. cd chatLogs
3. npm i


## get all messages of a user

curl --location --request GET 'http://localhost:8000/v1/chatlogs/12?limit=1&start=1654079911619'

## delete all messages of a user 

curl --location --request DELETE 'http://localhost:8000/v1/chatlogs/13'

## delete a message by message id

curl --location --request DELETE 'http://localhost:8000/v1/chatlogs/13/ec196489-bfe9-4713-8fa2-32a104f9b70d'

## post a message

curl --location --request POST 'http://localhost:8000/v1/chatlogs/13?message=hehe boi&isSent=true&timestamp=1654166703874' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "oh no",
    "timestamp": 1654079511819,
    "isSent":true
}'
