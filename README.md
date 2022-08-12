# Store Manager API
<br>
An simple e-commerce API with product and sales routes.
<br>
- Built with Node, Express, MySQL and Docker
- 100% unit test coverage with Mocha, Chai, and Sinnon
- Model, service and controller arquitecture
<br>
To run locally clone the repository and run the following commands:
`docker-compose up -d`
`docker exec -it store_manager bash`
`npm run migration`
`npm start`
<br>
Product end points are:
GET: http://localhost:3000/products
GET: http://localhost:3000/products/1
GET: http://localhost:3000/products/search?q=martelo
POST: http://localhost:3000/products body={"name": "productx"}
PUT: http://localhost:3000/products/1 body={"name": "productx"}
DELETE: http://localhost:3000/products/1
<br>
Sales end points are:
GET: http://localhost:3000/sales
GET: http://localhost:3000/sales/1
POST: http://localhost:3000/sales 
req.body = [{"productId": "1", "quantity": "3"}, {"productId": "3", "quantity": "3"}]
PUT: http://localhost:3000/sales/1 
req.body = [{"productId": "1", "quantity": "3"}, {"productId": "3", "quantity": "3"}]
DELETE: http://localhost:3000/sales/1
