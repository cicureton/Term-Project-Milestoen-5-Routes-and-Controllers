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
  const stmt = db.prepare(`
    INSERT INTO products (name, category, price, description, image)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    product.name,
    product.category,
    product.price,
    product.description,
    product.image || null
  );
  return { id: info.lastInsertRowid };
}

function updateProduct(id, product) {
  const stmt = db.prepare(`
    UPDATE products SET name = ?, category = ?, price = ?, description = ?, image = ?
    WHERE id = ?
  `);
  stmt.run(
    product.name,
    product.category,
    product.price,
    product.description,
    product.image || null,
    id
  );
  return { message: 'Product updated' };
}

function bulkInsert(products) {
  const stmt = db.prepare(`
    INSERT INTO products (name, category, price, description, image)
    VALUES (?, ?, ?, ?, ?)
  `);

  try {
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        if (!item.name || !item.category || typeof item.price !== 'number' || !item.description) {
          throw new Error(`Invalid product: ${JSON.stringify(item)}`);
        }
        stmt.run(
          item.name,
          item.category,
          item.price,
          item.description,
          item.image || null
        );
      }
    });

    insertMany(products);
    return { message: 'Bulk upload successful' };

  } catch (err) {
    console.error('Bulk insert error:', err.message);
    return { message: 'Bulk upload failed', error: err.message };
  }
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
