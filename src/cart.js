const CART_KEY = "amazonCloneCart";

function getCart() {
  const savedCart = localStorage.getItem(CART_KEY);
  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function removeLineFromCart(productId) {
  const nextCart = getCart().filter((item) => item.id !== productId);
  saveCart(nextCart);
  updateCartCount();
  renderCartItems();
}

function increaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) {
    return;
  }
  item.quantity += 1;
  saveCart(cart);
  updateCartCount();
  renderCartItems();
}

function decreaseQuantity(productId) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item || item.quantity <= 1) {
    return;
  }
  item.quantity -= 1;
  saveCart(cart);
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".header_basketCount").forEach((el) => {
    el.textContent = String(count);
  });
}

function bindCartQuantityControls() {
  document.querySelectorAll(".qty_plus").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-product-id");
      if (id) {
        increaseQuantity(id);
      }
    });
  });
  document.querySelectorAll(".qty_minus").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-product-id");
      if (id) {
        decreaseQuantity(id);
      }
    });
  });
  document.querySelectorAll(".remove_button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      if (productId) {
        removeLineFromCart(productId);
      }
    });
  });
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) {
    return;
  }

  const cart = getCart();
  const emptyMessage = document.getElementById("empty-message");
  const subtotalItems = document.getElementById("subtotal-items");
  const subtotalPrice = document.getElementById("subtotal-price");

  if (!cart.length) {
    cartItemsContainer.innerHTML = "";
    if (emptyMessage) {
      emptyMessage.style.display = "block";
    }
    if (subtotalItems) {
      subtotalItems.textContent = "Items (0)";
    }
    if (subtotalPrice) {
      subtotalPrice.textContent = "$0.00";
    }
    return;
  }

  if (emptyMessage) {
    emptyMessage.style.display = "none";
  }

  const populatedItems = cart.map((cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);
    if (!product) {
      return "";
    }

    return `
      <article class="checkout_product">
        <img
          class="checkout_product_image"
          src="${product.image}"
          alt="${product.title}"
        />
        <div class="checkout_product_info">
          <p class="checkout_product_title">${product.title}</p>
          <div class="checkout_product_rating">${"⭐".repeat(product.rating)}</div>
          <p class="checkout_product_price">
            <small>$</small>
            <strong>${product.price.toFixed(2)}</strong>
          </p>
          <div class="checkout_qty_row" role="group" aria-label="Quantity">
            <button type="button" class="qty_btn qty_minus" data-product-id="${product.id}" aria-label="Decrease quantity">−</button>
            <span class="qty_value" aria-live="polite">${cartItem.quantity}</span>
            <button type="button" class="qty_btn qty_plus" data-product-id="${product.id}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" data-product-id="${product.id}" class="remove_button">
            Remove from Basket
          </button>
        </div>
      </article>
    `;
  });

  cartItemsContainer.innerHTML = populatedItems.join("");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);
    if (!product) {
      return total;
    }
    return total + product.price * cartItem.quantity;
  }, 0);

  if (subtotalItems) {
    subtotalItems.textContent = `Items (${totalItems})`;
  }
  if (subtotalPrice) {
    subtotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  bindCartQuantityControls();
}
