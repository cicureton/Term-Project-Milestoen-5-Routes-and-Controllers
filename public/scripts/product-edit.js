document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (!productId) {
      alert('No product ID specified in the URL.');
      return;
    }
  
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        document.getElementById('product-id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('category').value = product.category;
        document.getElementById('price').value = product.price;
        document.getElementById('image').value = product.image || '';
      })
      .catch(err => console.error('Error loading product:', err));
  
    document.getElementById('edit-form').addEventListener('submit', e => {
      e.preventDefault();
  
      const updatedProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        image: document.getElementById('image').value,
      };
  
      fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })
        .then(res => res.json())
        .then(data => {
          alert('Product updated successfully!');
          window.location.href = 'admin-products.html';
        })
        .catch(err => console.error('Error updating product:', err));
    });
  });
  