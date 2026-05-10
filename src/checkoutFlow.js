const LAST_ORDER_KEY = "amazonCloneLastOrder";

function generateFakeOrderNumber() {
  const part = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ZA-${part}-${rand}`;
}

function populateCheckoutReview() {
  const box = document.getElementById("checkout-order-lines");
  if (!box || typeof products === "undefined") {
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    box.innerHTML =
      '<p class="checkout_empty_notice">Your cart is empty. <a href="../cart/cart.html">Return to basket</a></p>';
    const form = document.getElementById("checkout-form");
    if (form) {
      form.hidden = true;
    }
    const placeBtn = document.getElementById("place-order-btn");
    if (placeBtn) {
      placeBtn.disabled = true;
    }
    return;
  }

  box.innerHTML = cart
    .map((entry) => {
      const product = products.find((p) => p.id === entry.id);
      if (!product) {
        return "";
      }
      const lineTotal = product.price * entry.quantity;
      return `
        <li class="order_summary_row">
          <span class="order_summary_title">${product.title}</span>
          <span class="order_summary_qty">×${entry.quantity}</span>
          <span class="order_summary_line_total">$${lineTotal.toFixed(2)}</span>
        </li>
      `;
    })
    .join("");

  const totals = cart.reduce(
    (acc, entry) => {
      const product = products.find((p) => p.id === entry.id);
      if (!product) {
        return acc;
      }
      acc.qty += entry.quantity;
      acc.sum += product.price * entry.quantity;
      return acc;
    },
    { qty: 0, sum: 0 }
  );

  const countEl = document.getElementById("checkout-summary-count");
  const totalEl = document.getElementById("checkout-summary-total");
  if (countEl) {
    countEl.textContent = `Items (${totals.qty})`;
  }
  if (totalEl) {
    totalEl.textContent = `$${totals.sum.toFixed(2)}`;
  }
}

function saveFakeOrder(payload) {
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(payload));
}

function getLastSavedOrder() {
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function bindPlaceOrder(form) {
  if (!form) {
    return;
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cart = getCart();
    if (!cart.length) {
      return;
    }

    const formData = new FormData(form);
    const shipping = {
      fullName: (formData.get("fullName") || "").trim(),
      email: (formData.get("email") || "").trim(),
      address: (formData.get("address") || "").trim(),
      city: (formData.get("city") || "").trim(),
      postalCode: (formData.get("postalCode") || "").trim()
    };

    const deliveryOption = formData.get("deliveryOption") || "standard";

    const lines = cart
      .map((entry) => {
        const product = products.find((p) => p.id === entry.id);
        if (!product) {
          return null;
        }
        return {
          id: product.id,
          title: product.title,
          unitPrice: product.price,
          quantity: entry.quantity,
          lineTotal: product.price * entry.quantity
        };
      })
      .filter(Boolean);

    const grandTotal = lines.reduce((total, row) => total + row.lineTotal, 0);

    saveFakeOrder({
      orderNumber: generateFakeOrderNumber(),
      placedAt: new Date().toISOString(),
      shipping,
      deliveryOption,
      lines,
      total: grandTotal
    });

    saveCart([]);
    updateCartCount();
    window.location.href = "../confirmation/confirmation.html";
  });
}

function renderConfirmationPage() {
  const order = getLastSavedOrder();
  const numberEl = document.getElementById("confirmation-order-number");
  const messageEl = document.getElementById("confirmation-detail");
  if (!numberEl || !messageEl) {
    return;
  }

  if (!order || !order.orderNumber) {
    numberEl.textContent = "—";
    messageEl.textContent =
      "We couldn't find order details here. Browse the shop and place a demo order anytime.";
    return;
  }

  numberEl.textContent = order.orderNumber;
  messageEl.innerHTML =
    `<p><strong>${order.lines.length}</strong> line item(s) · Total paid (demo): <strong>$${order.total.toFixed(2)}</strong></p>` +
    `<p>Shipping to ${order.shipping.city}, confirmation sent to ${order.shipping.email}.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  populateCheckoutReview();
  bindPlaceOrder(document.getElementById("checkout-form"));
  renderConfirmationPage();
});
