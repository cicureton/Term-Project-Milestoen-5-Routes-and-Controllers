document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('productList');
  const searchInput = document.getElementById('searchInput');

  async function fetchAndDisplayProducts(query = '') {
    let url = '/api/products';
    if (query) url += `/search?q=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const products = await res.json();

    productList.innerHTML = '';
    if (products.length === 0) {
      productList.innerHTML = '<p>No products found.</p>';
      return;
    }

    products.forEach(p => {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.innerHTML = `
          <img src="images/${p.image || 'placeholder.jpg'}" alt="${p.name}" class="product-image">
          <div class="product-details">
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Name:</strong> ${p.name}</p>
            <p><strong>Category:</strong> ${p.category}</p>
            <p><strong>Price:</strong> $${p.price}</p>
            <div class="product-actions">
              <a href="product-edit.html?id=${p.id}"><button>Edit</button></a>
              <button onclick="alert('Archive not implemented')">Archive</button>
              <button onclick="alert('Delete not implemented')">Delete</button>
            </div>
          </div>
        `;
      productList.appendChild(item);
    });
  }

  searchInput.addEventListener('input', () => {
    fetchAndDisplayProducts(searchInput.value.trim());
  });

  fetchAndDisplayProducts();
});
