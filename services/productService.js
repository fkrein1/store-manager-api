const productModel = require('../models/productModel');

async function getAll() {
  const products = await productModel.getAll();
  if (!products || products.length === 0) {
    return { error: { message: 'Products not found' }, code: 404 };
  }
  return { data: products, code: 200 };
}

async function getById(id) {
  const product = await productModel.getById(id);
  if (!product) return { error: { message: 'Product not found' }, code: 404 };
  return { data: product, code: 200 };
}

async function getByName(name) {
  const product = await productModel.getByName(name);
  if (!product || product.length === 0) {
    return { error: { message: 'Product not found' }, code: 404 };
  }
  return { data: product, code: 200 };
}

async function create({ name }) {
  if (!name) return { error: { message: '"name" is required' }, code: 400 };
  if (name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, code: 422 };
  }
  const product = await productModel.create({ name });
  return { data: product, code: 201 };
}

async function update({ id, name }) {
  if (!name) return { error: { message: '"name" is required' }, code: 400 };
  if (name.length < 5) {
    return { error: { message: '"name" length must be at least 5 characters long' }, code: 422 };
  }
  const checkProduct = await productModel.getById(id);
  if (!checkProduct) return { error: { message: 'Product not found' }, code: 404 };

  const product = await productModel.update({ id, name });
  return { data: product, code: 200 };
}

async function exclude(id) {
  const product = await productModel.getById(id);
  if (!product) return { error: { message: 'Product not found' }, code: 404 };
  await productModel.exclude(id);
  return { data: { message: `Product id ${id} was deleted` }, code: 204 };
}

module.exports = { getAll, getById, getByName, create, update, exclude };