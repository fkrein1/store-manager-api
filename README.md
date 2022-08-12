# Store Manager API

API for an e-commerce store with a product and a sales endpoint.

  - Built with Node, Express, MySQL and Docker  
  - 100% unit test coverage with Mocha, Chai, and Sinnon
  - Model, service and controller arquitecture
  
To run locally clone the repository and run the following commands:
<br>

```
$ docker-compose up -d
$ docker exec -it store_manager bash
$ npm run migration
$ npm start
$ npm run test:mocha
```
<br>
Product methods are:

  - GET | http://localhost:3000/products
  - GET | http://localhost:3000/products/:id
  - GET | http://localhost:3000/products/search?q=name
  - POST | http://localhost:3000/products
  - PUT | http://localhost:3000/products/:id
  - DELETE |  http://localhost:3000/products/:id

Request Body format for PUT and POST:
```json
{"name": "productx"}
```
<br>
Sales methods are:

  - GET | http://localhost:3000/sales
  - GET | http://localhost:3000/sales/:id
  - POST | http://localhost:3000/sales 
  - PUT | http://localhost:3000/sales/:id
  - DELETE | http://localhost:3000/sales/:id

Request Body format for PUT and POST:
```json
[
  {"productId": "1", "quantity": "3"}, 
  {"productId": "3", "quantity": "5"}
]
```
