const salesService = require('../services/salesService');

async function getAll(_req, res) {
  const { data, error, code } = await salesService.getAll();
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function getById(req, res) {
  const { id } = req.params;
  const { data, error, code } = await salesService.getById(id);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function create(req, res) {
  const { data, error, code } = await salesService.create(req.body);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function update(req, res) {
  const { data, error, code } = await salesService.update(req.params, req.body);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

async function exclude(req, res) {
  const { id } = req.params;
  const { data, error, code } = await salesService.exclude(id);
  if (error) return res.status(code).json(error);
  return res.status(code).json(data);
}

module.exports = { getAll, getById, create, update, exclude };