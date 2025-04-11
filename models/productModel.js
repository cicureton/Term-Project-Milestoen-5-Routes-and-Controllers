const db = require('../db');

function getAllProducts() {
  return db.prepare('SELECT * FROM products').all();
}

function getProductById(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
}

function searchProducts(query) {
  return db.prepare('SELECT * FROM products WHERE name LIKE ?').all(`%${query}%`);
}

function getProductsByCategory(category) {
  return db.prepare('SELECT * FROM products WHERE category = ?').all(category);
}

function insertProduct(product) {
  const stmt = db.prepare('INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?)');
  const info = stmt.run(product.name, product.category, product.price, product.description);
  return { id: info.lastInsertRowid };
}

function updateProduct(id, product) {
  const stmt = db.prepare('UPDATE products SET name = ?, category = ?, price = ?, description = ? WHERE id = ?');
  stmt.run(product.name, product.category, product.price, product.description, id);
  return { message: 'Product updated' };
}

function bulkInsert(products) {
  const stmt = db.prepare('INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?)');
  const insertMany = db.transaction((items) => {
    for (const item of items) {
      stmt.run(item.name, item.category, item.price, item.description);
    }
  });
  insertMany(products);
  return { message: 'Bulk insert completed' };
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  insertProduct,
  updateProduct,
  bulkInsert,
};
