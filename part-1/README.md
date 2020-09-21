
# Set Up

  

1. Clone o Projeto

2. execute **npm i**

  
# TEST

  

com o comando

  

>  **npm run test**

  

# API

  

## Add Products

    POST /v1/products HTTP/1.1
    Host: XXX
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: XXX
    
    {
    	"id" : "123",
    	"name" : "name1"
    }

Resposta

    {
        "message": "ok",
        "data": {
            "id": "123",
            "name": "name1",
            "dateCreation": "2020-09-21T22:24:30.761Z",
            "_id": "zqBXrKqxb23kiOwZ"
        } }

Resposta dentro do 10 Min.

    {
        "message": "Nok"
    }
