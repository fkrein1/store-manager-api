const connection = require('./connection');

async function getAll() {
  const query = [
    'SELECT id as saleId, date, product_id as productId, quantity',
    'FROM StoreManager.sales',
    'JOIN StoreManager.sales_products ON id = sale_id',
  ].join(' ');
  const [sales] = await connection.execute(query);
  return sales;
}

async function getById(id) {
  const query = [
    'SELECT date, product_id as productId, quantity',
    'FROM StoreManager.sales',
    'JOIN StoreManager.sales_products ON id = sale_id',
    'WHERE id = ?',
  ].join(' ');
  const [sale] = await connection.execute(query, [id]);
  return sale;
}

async function createSale() {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES ()',
  );
  return response.insertId;
}

async function createSaleAndProduct(saleId, productId, quantity) {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return true;
}

async function update(saleId, productId, quantity) {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [quantity, productId, saleId],
  );
  return true;
}

async function exclude(id) {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
    await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return id;
}

module.exports = { getAll, getById, createSale, createSaleAndProduct, update, exclude };