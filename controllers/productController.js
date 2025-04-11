const productModel = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  res.json(productModel.getAllProducts());
};

exports.getProductById = (req, res) => {
  res.json(productModel.getProductById(req.params.id));
};

exports.searchProducts = (req, res) => {
  const { q, category } = req.query;
  if (q) return res.json(productModel.searchProducts(q));
  if (category) return res.json(productModel.getProductsByCategory(category));
  res.json([]);
};
