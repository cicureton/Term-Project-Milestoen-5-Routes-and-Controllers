async function fetchCart() {
    const res = await fetch('/api/cart');
    const items = await res.json();
    renderCart(items);
  }
  
  function renderCart(items) {
    const container = document.getElementById('shopping-cart');
    container.innerHTML = '<h2>Shopping Cart</h2>';
  
    if (items.length === 0) {
      container.innerHTML += '<p>Your cart is empty.</p>';
      return;
    }
  
    let subtotal = 0;
  
    items.forEach(item => {
      subtotal += item.price;
  
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
  
      itemDiv.innerHTML = `
        <img src="images/${item.image || 'placeholder.jpg'}" alt="${item.name}">
        <p>Name: ${item.name}</p>
        <p>Price: $${item.price}</p>
        <label>Quantity: <input type="number" value="1" min="1" disabled></label>
        <p>Total: $${item.price}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
  
      container.appendChild(itemDiv);
    });
  
    const tax = +(subtotal * 0.0675).toFixed(2);
    const delivery = 50;
    const total = +(subtotal + tax + delivery).toFixed(2);
  
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'cart-summary';
    summaryDiv.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax (6.75%): $${tax}</p>
      <p>Delivery Fee: $${delivery}</p>
      <p>Total: $${total}</p>
      <button onclick="checkout()">Proceed to Checkout</button>
    `;
  
    container.appendChild(summaryDiv);
  }
  
  async function removeFromCart(productId) {
    await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
    fetchCart();
  }
  
  async function checkout() {
    const res = await fetch('/api/cart/checkout', { method: 'POST' });
    const data = await res.json();
    alert(data.message);
    fetchCart();
  }
  
  fetchCart();
  