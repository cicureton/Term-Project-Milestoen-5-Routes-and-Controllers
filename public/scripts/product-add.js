document.getElementById('add-product-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const product = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value || 'placeholder.jpg' 
  };

  try {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('add-product-form').reset();
    } else {
      alert('Error adding product.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to add product.');
  }
});
