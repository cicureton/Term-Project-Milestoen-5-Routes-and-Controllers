document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
  
    if (!productId) {
      document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    try {
      const res = await fetch(`/api/products/${productId}`);
      const product = await res.json();
  
      const section = document.getElementById('product-details');
      section.innerHTML = `
        <img src="images/${product.image || 'placeholder.jpg'}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
        <p>Category: ${product.category}</p>
        <button id="add-to-cart">Add to Cart</button>
      `;
  
      document.getElementById('add-to-cart').addEventListener('click', async () => {
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, quantity: 1 })
          });
  
          const result = await response.json();
          alert(result.message || 'Added to cart!');
          console.log('Cart Response:', result);
        } catch (err) {
          console.error('Error adding to cart:', err);
          alert('Failed to add to cart.');
        }
      });
  
    } catch (err) {
      console.error('Error loading product:', err);
      document.getElementById('product-details').innerHTML = '<p>Error loading product.</p>';
    }
  });
  