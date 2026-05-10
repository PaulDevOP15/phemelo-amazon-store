const WISHLIST_KEY = "amazonCloneWishlist";

function readWishlistIds() {
  const raw = localStorage.getItem(WISHLIST_KEY);
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeWishlistIds(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

function isInWishlist(productId) {
  return readWishlistIds().includes(productId);
}

function addToWishlist(productId) {
  const ids = readWishlistIds();
  if (ids.includes(productId)) {
    return;
  }
  ids.push(productId);
  writeWishlistIds(ids);
}

function removeFromWishlist(productId) {
  const next = readWishlistIds().filter((id) => id !== productId);
  writeWishlistIds(next);
}

function toggleWishlistProduct(productId) {
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
  } else {
    addToWishlist(productId);
  }
}

function renderWishlist() {
  const container = document.getElementById("wishlist-grid");
  if (!container) {
    return;
  }

  const ids = readWishlistIds();
  const list = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  if (!list.length) {
    container.innerHTML =
      '<p class="empty_message wishlist_empty" role="status">Your wishlist is empty. Save items with the heart on any product.</p>';
    return;
  }

  if (typeof productCardTemplate !== "function") {
    return;
  }

  container.innerHTML = list.map(productCardTemplate).join("");
  if (typeof bindAddToCartButtons === "function") {
    bindAddToCartButtons();
  }
  if (typeof bindWishlistButtons === "function") {
    bindWishlistButtons();
  }
}
