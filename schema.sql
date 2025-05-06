CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  price REAL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id)
);