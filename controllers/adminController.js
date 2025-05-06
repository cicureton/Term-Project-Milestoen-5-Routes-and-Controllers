const productModel = require('../models/productModel');

exports.addProduct = (req, res) => {
  const newProduct = productModel.insertProduct(req.body);
  res.json(newProduct);
};

exports.editProduct = (req, res) => {
  const id = req.params.id;
  productModel.updateProduct(id, req.body);
  res.json({ message: 'Product updated' });
};

exports.bulkUpload = (req, res) => {
  const products = req.body;
  console.log('Received products:', products);
  if (!Array.isArray(products)) {
    return res.status(400).json({ message: 'Invalid format, expected an array of products' });
  }

  const result = productModel.bulkInsert(products);
  res.json(result);
};
