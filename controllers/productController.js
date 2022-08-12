const productService = require('../services/productService');

async function getAll(_req, res) {
  const { data, error, code } = await productService.getAll();
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function getById(req, res) {
  const { id } = req.params;
  const { data, error, code } = await productService.getById(id);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function getByName(req, res) {
  const { q } = req.query;
  const { data, error, code } = await productService.getByName(q);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function create(req, res) {
  const { data, error, code } = await productService.create(req.body);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function update(req, res) {
  const { data, error, code } = await productService.update({ ...req.body, ...req.params });
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function exclude(req, res) {
  const { id } = req.params;
  const { data, error, code } = await productService.exclude(id);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

module.exports = { getAll, getById, getByName, create, update, exclude };