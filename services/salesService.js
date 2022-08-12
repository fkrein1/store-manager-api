const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

async function getAll() {
  const sales = await salesModel.getAll();
  if (!sales || sales.length === 0) {
    return { error: { message: 'Sale not found' }, code: 404 };
  }
  return { data: sales, code: 200 };
}

async function getById(id) {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) return { error: { message: 'Sale not found' }, code: 404 };
  return { data: sale, code: 200 };
}

function validateSaleInput(sales) {
    if (sales.find((sale) => sale.productId === undefined)) {
    return { error: { message: '"productId" is required' }, code: 400 };
  }
  if (sales.find((sale) => sale.quantity === undefined)) {
    return { error: { message: '"quantity" is required' }, code: 400 };
  }
  if (sales.find((sale) => sale.quantity < 1)) {
  return { error: { message: '"quantity" must be greater than or equal to 1' }, code: 422 };
  }
}

async function validateProducts(sales) {
    const productValidation = await Promise
    .all(sales.map((sale) => productModel.getById(sale.productId)));
  
  if (productValidation.includes(undefined)) {
    return { error: { message: 'Product not found' }, code: 404 };
  }
}

async function create(sales) {
  const invalidSale = validateSaleInput(sales);
  if (invalidSale) return invalidSale;

  const invalidProduct = await validateProducts(sales);
  if (invalidProduct) return invalidProduct;

  const saleId = await salesModel.createSale();
  await Promise.all(sales.map((sale) =>
    salesModel.createSaleAndProduct(saleId, sale.productId, sale.quantity)));
  return { data: { id: saleId, itemsSold: sales }, code: 201 };
}

async function update({ id }, sales) {
  const invalidSale = validateSaleInput(sales);
  if (invalidSale) return invalidSale;

  const invalidProduct = await validateProducts(sales);
  if (invalidProduct) return invalidProduct;

  const isSaleReal = await salesModel.getById(id);
  if (!isSaleReal || isSaleReal.length === 0) {
    return { error: { message: 'Sale not found' }, code: 404 };
  }
  await Promise.all(sales.map((sale) =>
    salesModel.update(id, sale.productId, sale.quantity)));
  return { data: { saleId: id, itemsUpdated: sales }, code: 200 };
}

async function exclude(id) {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) return { error: { message: 'Sale not found' }, code: 404 };
  await salesModel.exclude(id);
  return { data: { message: `Product id ${id} was deleted` }, code: 204 };
}

module.exports = { getAll, getById, create, update, exclude };