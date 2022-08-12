const express = require('express');
require('dotenv').config();
require('express-async-errors');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

app.get('/products', productController.getAll);
app.get('/products/search', productController.getByName);
app.get('/products/:id', productController.getById);
app.post('/products', productController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.exclude);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.post('/sales', salesController.create);
app.put('/sales/:id', salesController.update);
app.delete('/sales/:id', salesController.exclude);

app.use((err, _req, res, _next) => {
  res.status(500).json({ erro: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening PORT 3000`);
});
