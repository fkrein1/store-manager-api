const connection = require('./connection');

async function getAll() {
  const [products] = await connection.execute('SELECT id, name FROM StoreManager.products');
  return products;
}

async function getById(id) {
  const [product] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product[0];
}

async function getByName(name) {
  const [product] = await connection.execute(
    'SELECT id, name FROM StoreManager.products WHERE name LIKE ?',
    [`%${name}%`],
  );
  return product;
}

async function create({ name }) {
  const [response] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return { id: response.insertId, name };
}

async function update({ id, name }) {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
}

async function exclude(id) {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return id;
}

module.exports = { getAll, getById, getByName, create, update, exclude };