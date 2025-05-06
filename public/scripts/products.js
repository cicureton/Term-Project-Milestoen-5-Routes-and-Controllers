document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const filterBtn = document.getElementById('filter-btn');
  
    function renderProduct(product) {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="images/${product.image || 'placeholder.jpg'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <a href="details.html?id=${product.id}">View Details</a>
      `;
      return div;
    }
  
    function fetchAndRenderProducts(query = '', category = '') {
      let url = '/api/products';
      if (query || category) {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (category) params.append('category', category);
        url += `/search?${params.toString()}`;
      }
  
      console.log('Fetching from:', url);
  
      fetch(url)
        .then(res => res.json())
        .then(products => {
          productList.innerHTML = '';
          products.forEach(product => {
            productList.appendChild(renderProduct(product));
          });
        })
        .catch(err => {
          console.error('Error fetching products:', err);
          productList.innerHTML = '<p>Error loading products.</p>';
        });
    }
  
    filterBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      const category = categorySelect.value;
      fetchAndRenderProducts(query, category);
    });
  
    fetchAndRenderProducts();
  });
  