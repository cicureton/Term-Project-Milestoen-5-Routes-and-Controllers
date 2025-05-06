const express = require('express');
const app = express();
const PORT = 3000;
const seed = require('./seed');

seed();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
