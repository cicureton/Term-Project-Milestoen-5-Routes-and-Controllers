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
  productModel.bulkInsert(req.body);
  res.json({ message: 'Bulk upload successful' });
};
