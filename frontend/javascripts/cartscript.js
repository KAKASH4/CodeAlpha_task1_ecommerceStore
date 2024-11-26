const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const backBtn = document.getElementById('back-btn');
const checkoutBtn = document.getElementById('checkout-btn');

document.addEventListener('DOMContentLoaded', async () => {
  await displayCartItems();
  calculateTotalPrice();
});

// Fetch cart items from the backend
async function fetchCartItems() {
  try {
    const response = await fetch('http://localhost:4000/api/cart');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

// Display cart items
async function displayCartItems() {
  const cart = await fetchCartItems();
  cartItemsContainer.innerHTML = '';

  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.image_path}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <input type="number" class="quantity-input" min="1" value="${item.quantity}" data-id="${item.product_id}">
      </div>
      <button class="delete-btn" data-id="${item.product_id}">🗑️ Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners for quantity change and delete buttons
  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', handleQuantityChange);
  });
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', removeFromCart);
  });
}

// Handle quantity change
async function handleQuantityChange(event) {
  const productId = event.target.dataset.id;
  const newQuantity = parseInt(event.target.value);

  if (newQuantity > 0) {
    try {
      await fetch(`http://localhost:4000/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      calculateTotalPrice();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity.');
    }
  } else {
    alert('Quantity must be at least 1.');
    event.target.value = 1;
  }
}

// Calculate total price
async function calculateTotalPrice() {
  const cart = await fetchCartItems();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
async function removeFromCart(event) {
  const productId = event.target.dataset.id;

  if (confirm('Are you sure you want to remove this item from the cart?')) {
    try {
      await fetch(`http://localhost:4000/api/cart/delete/${productId}`, {
        method: 'DELETE',
      });
      await displayCartItems();
      calculateTotalPrice();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart.');
    }
  }
}

// Checkout
checkoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:4000/api/cart/checkout', {
      method: 'POST',
    });
    const data = await response.json();

    if (data.message) {
      alert(data.message);
      // Optionally, redirect to order summary or clear the cart view
      cartItemsContainer.innerHTML = '';
      totalPriceElement.textContent = '0';
    } else {
      alert('Checkout failed. Please try again.');
    }
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('Checkout failed.');
  }
});

// Navigate back to the products page
backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
