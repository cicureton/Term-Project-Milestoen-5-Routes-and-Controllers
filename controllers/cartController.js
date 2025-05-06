const cartModel = require('../models/cartModel');

exports.addToCart = (req, res) => {
  res.json(cartModel.addToCart(req.body));
};

exports.removeFromCart = (req, res) => {
  res.json(cartModel.removeFromCart(req.params.productId));
};

exports.checkout = (req, res) => {
  res.json(cartModel.checkout());
};

exports.getCart = (req, res) => {
  res.json(cartModel.getCartContents());
};

