const db = require('./db');

function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      description 
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
}

function seedSampleProducts() {
  const existing = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (existing.count === 0) {
    const stmt = db.prepare('INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?)');
    const sample = [
      ['Oak Dining Table', 'Dining', 299.99, 'Solid oak dining table, seats 6.'],
      ['Leather Armchair', 'Seating', 199.99, 'Comfortable brown leather chair.'],
      ['Bookshelf', 'Storage', 89.99, '5-tier wooden bookshelf.'],
    ];

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        stmt.run(...item);
      }
    });

    insertMany(sample);
    console.log('Sample products inserted.');
  }
}

function runSeed() {
  initializeSchema();
  seedSampleProducts();
}

module.exports = runSeed;
