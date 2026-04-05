let cart = JSON.parse(localStorage.getItem('restaurant_cart')) || [];

// Add item to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCartUI();
    saveCart();
}

// Update the Cart count bubble in the UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if(cartCount) {
        cartCount.innerText = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
}

// Save to Local Storage
function saveCart() {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
}

// Clear cart after successful order
function clearCart() {
    cart = [];
    localStorage.removeItem('restaurant_cart');
    updateCartUI();
}