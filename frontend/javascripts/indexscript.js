const products = [];
const productContainer = document.querySelector('#product-container');

// const productContainer = document.querySelector('.product-container');

productContainer.addEventListener('click', (e) => {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains('delete-btn')) {
    const productId = e.target.getAttribute('data-id');
    console.log('hit....');
    deleteProduct(productId);
  }
});
// Fetch products from the backend when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:4000/api/product/getProducts', {
      method: 'GET',
    });
    const data = await response.json();
    products.push(...data);
    displayProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

// Display all products
function displayProducts() {
  productContainer.innerHTML = '';

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image_path}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart('${product.product_id}')">Add to Cart</button>
      <button class="delete-btn" data-id="${product.product_id}">🗑️ Delete Product</button>
    `;

    productContainer.appendChild(productCard);
  });

  // Add event listeners for delete buttons
  productContainer.addEventListener('click', handleDeleteClick);
}

// Handle delete button click
function handleDeleteClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const productId = event.target.getAttribute('data-id');
    deleteProduct(productId);
  }
}

// Delete a product using the backend API
async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:4000/api/product/delete/${productId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      alert('Product deleted successfully from the database!');
      // Remove the product card from the DOM
      //document.querySelector(`[data-id="${productId}"]`).closest('.product-card').remove();
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete the product from the database.');
  }
}

// Add product to the cart using the backend API
async function addToCart(productId) {
  try {
    const product = products.find((item) => item.product_id === productId);

    if (!product) {
      alert('Product not found.');
      return;
    }

    const response = await fetch('http://localhost:4000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        name: product.name,
        price: product.price,
        image_path: product.image_path,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (data.message) {
      alert(`${product.name} added to cart!`);
    } else {
      alert('Failed to add product to cart.');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    alert('Failed to add product to cart.');
  }
}

// Navigate to the cart page
document.getElementById('cart-btn').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

// Navigate to the add product page
document.getElementById('add-product-btn').addEventListener('click', () => {
  window.location.href = 'add-product.html';
});
