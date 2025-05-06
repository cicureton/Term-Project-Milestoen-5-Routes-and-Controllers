const db = require('../db');

function addToCart({ productId }) {
  const stmt = db.prepare('INSERT INTO cart (product_id) VALUES (?)');
  stmt.run(productId);
  return { message: 'Product added to cart' };
}

function removeFromCart(productId) {
  const stmt = db.prepare('DELETE FROM cart WHERE product_id = ? LIMIT 1');
  stmt.run(productId);
  return { message: 'Product removed from cart' };
}

function checkout() {
  db.prepare('DELETE FROM cart').run();
  return { message: 'Cart checked out' };
}

function getCartContents() {
  return db.prepare(`
    SELECT p.* FROM products p
    JOIN cart c ON p.id = c.product_id
  `).all();
}

module.exports = {
  addToCart,
  removeFromCart,
  checkout,
  getCartContents,
};
