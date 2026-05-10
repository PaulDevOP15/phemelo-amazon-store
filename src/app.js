/** Cross-page links when HTML lives under /index, /cart, /product-details/, etc. */
function appPageUrl(pathFromProjectRoot) {
  return `../${pathFromProjectRoot}`;
}

const SEARCH_STORAGE_KEY = "amazonCloneSearch";
const FILTER_STORAGE_KEY = "amazonCloneCatalogFilters";

const DEFAULT_FILTERS = {
  category: "all",
  priceRange: "all",
  sort: "featured"
};

function loadFilterState() {
  try {
    const raw = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_FILTERS };
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_FILTERS, ...parsed };
  } catch (error) {
    return { ...DEFAULT_FILTERS };
  }
}

function saveFilterState(state) {
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state));
}

function getLastSearchTerm() {
  return localStorage.getItem(SEARCH_STORAGE_KEY) || "";
}

function setLastSearchTerm(value) {
  localStorage.setItem(SEARCH_STORAGE_KEY, value);
}

function searchProducts(productList, rawQuery) {
  const q = (rawQuery || "").trim().toLowerCase();
  if (!q) {
    return productList.slice();
  }
  return productList.filter((product) =>
    product.title.toLowerCase().includes(q)
  );
}

function filterProductsByCategory(productList, category) {
  if (!category || category === "all") {
    return productList.slice();
  }
  return productList.filter((product) => product.category === category);
}

function filterProductsByPrice(productList, rangeKey) {
  if (!rangeKey || rangeKey === "all") {
    return productList.slice();
  }
  const copy = productList.slice();
  if (rangeKey === "under50") {
    return copy.filter((product) => product.price < 50);
  }
  if (rangeKey === "50-100") {
    return copy.filter((product) => product.price >= 50 && product.price < 100);
  }
  if (rangeKey === "100-200") {
    return copy.filter((product) => product.price >= 100 && product.price < 200);
  }
  if (rangeKey === "200plus") {
    return copy.filter((product) => product.price >= 200);
  }
  return copy;
}

function sortProducts(productList, sortKey) {
  const list = productList.slice();
  if (sortKey === "price-asc") {
    list.sort((a, b) => a.price - b.price);
    return list;
  }
  if (sortKey === "price-desc") {
    list.sort((a, b) => b.price - a.price);
    return list;
  }
  if (sortKey === "rating-desc") {
    list.sort((a, b) => b.rating - a.rating);
    return list;
  }
  if (sortKey === "name-asc") {
    list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
    return list;
  }
  return list;
}

function applyCatalogFilters(productSource) {
  const searchTerm = getLastSearchTerm();
  let working = searchProducts(productSource, searchTerm);

  const filters = loadFilterState();
  working = filterProductsByCategory(working, filters.category);
  working = filterProductsByPrice(working, filters.priceRange);
  working = sortProducts(working, filters.sort);
  return working;
}

function syncFilterControlsFromStorage() {
  const filters = loadFilterState();

  document.querySelectorAll(".catalog_category_btn").forEach((button) => {
    const selected = button.getAttribute("data-category") === filters.category;
    button.classList.toggle("catalog_category_btn--active", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  const categorySelect = document.getElementById("catalog-category");
  if (categorySelect && categorySelect.value !== filters.category) {
    categorySelect.value = filters.category;
  }

  const priceEl = document.getElementById("catalog-price-range");
  if (priceEl && priceEl.value !== filters.priceRange) {
    priceEl.value = filters.priceRange;
  }

  const sortEl = document.getElementById("catalog-sort");
  if (sortEl && sortEl.value !== filters.sort) {
    sortEl.value = filters.sort;
  }
}

function persistCategory(value) {
  const next = { ...loadFilterState(), category: value };
  saveFilterState(next);
  const sel = document.getElementById("catalog-category");
  if (sel) {
    sel.value = value;
  }
  syncFilterControlsFromStorage();
  renderProductGrid();
}

function persistPriceRange(value) {
  const next = { ...loadFilterState(), priceRange: value };
  saveFilterState(next);
  syncFilterControlsFromStorage();
  renderProductGrid();
}

function persistSort(value) {
  const next = { ...loadFilterState(), sort: value };
  saveFilterState(next);
  syncFilterControlsFromStorage();
  renderProductGrid();
}

function initCatalogToolbar() {
  syncFilterControlsFromStorage();

  document.querySelectorAll(".catalog_category_btn").forEach((button) => {
    button.addEventListener("click", () => {
      persistCategory(button.getAttribute("data-category") || "all");
    });
  });

  const categorySelect = document.getElementById("catalog-category");
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      persistCategory(categorySelect.value);
    });
  }

  const priceEl = document.getElementById("catalog-price-range");
  if (priceEl) {
    priceEl.addEventListener("change", () => persistPriceRange(priceEl.value));
  }

  const sortEl = document.getElementById("catalog-sort");
  if (sortEl) {
    sortEl.addEventListener("change", () => persistSort(sortEl.value));
  }
}

function syncSearchInputsFromStorage() {
  const term = getLastSearchTerm();
  document.querySelectorAll(".header_input").forEach((input) => {
    if (input.value !== term) {
      input.value = term;
    }
  });
}

function initHeaderSearch() {
  syncSearchInputsFromStorage();

  document.querySelectorAll(".header_search").forEach((wrapper) => {
    const input = wrapper.querySelector(".header_input");
    if (!input) {
      return;
    }
    input.addEventListener("input", () => {
      setLastSearchTerm(input.value);
      document.querySelectorAll(".header_input").forEach((other) => {
        if (other !== input) {
          other.value = input.value;
        }
      });
      if (document.getElementById("product-grid")) {
        renderProductGrid();
      }
    });
  });
}

function productCardTemplate(product) {
  const saleClass = product.onSale ? "product_on_sale" : "";
  const saleBadge = product.onSale ? '<span class="sale_badge">On Sale</span>' : "";
  const wishActive = typeof isInWishlist === "function" && isInWishlist(product.id);
  const heartClass = wishActive ? "fa-solid" : "fa-regular";
  const wishLabel = wishActive ? "Remove from wishlist" : "Save to wishlist";

  return `
    <article class="product ${saleClass}">
      ${saleBadge}
      <button
        type="button"
        class="product_wishlist_btn"
        data-product-id="${product.id}"
        aria-label="${wishLabel}"
        aria-pressed="${wishActive ? "true" : "false"}"
      >
        <i class="fa-heart ${heartClass}" aria-hidden="true"></i>
      </button>
      <a href="${appPageUrl(`product-details/product-details.html?id=${encodeURIComponent(product.id)}`)}" aria-label="View ${product.title}">
        <img src="${product.image}" alt="${product.title}" />
      </a>
      <div class="product_info">
        <p class="product_category_label">${product.category}</p>
        <p class="product_title">${product.title}</p>
        <p class="product_price">
          <small>$</small>
          <strong>${product.price.toFixed(2)}</strong>
        </p>
        <div class="product_rating">${"⭐".repeat(product.rating)}</div>
      </div>
      <button type="button" class="add_to_cart_button" data-product-id="${product.id}">
        Add to Basket
      </button>
    </article>
  `;
}

function renderProductGrid() {
  const productGrid = document.getElementById("product-grid");
  if (!productGrid) {
    return;
  }

  const visible = applyCatalogFilters(products);
  if (!visible.length) {
    productGrid.innerHTML =
      '<p class="catalog_no_results" role="status">No products match your search or filters.</p>';
    return;
  }

  productGrid.innerHTML = visible.map(productCardTemplate).join("");
  bindAddToCartButtons();
  bindWishlistButtons();
}

function bindWishlistButtons() {
  document.querySelectorAll(".product_wishlist_btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const productId = button.getAttribute("data-product-id");
      if (!productId) {
        return;
      }
      toggleWishlistProduct(productId);
      button.setAttribute("aria-pressed", isInWishlist(productId) ? "true" : "false");
      const icon = button.querySelector(".fa-heart");
      if (icon) {
        icon.classList.toggle("fa-solid", isInWishlist(productId));
        icon.classList.toggle("fa-regular", !isInWishlist(productId));
      }
      button.setAttribute(
        "aria-label",
        isInWishlist(productId) ? "Remove from wishlist" : "Save to wishlist"
      );
      if (typeof renderWishlist === "function") {
        renderWishlist();
      }
    });
  });
}

function renderProductDetails() {
  const detailsContainer = document.getElementById("product-details");
  if (!detailsContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find((item) => item.id === productId) || products[0];
  const wishActive = typeof isInWishlist === "function" && isInWishlist(product.id);
  const heartClass = wishActive ? "fa-solid" : "fa-regular";

  detailsContainer.innerHTML = `
    <img class="product_details_image" src="${product.image}" alt="${product.title}" />
    <section>
      <p class="product_category_label">${product.category}</p>
      <h1>${product.title}</h1>
      <p class="product_price"><small>$</small><strong>${product.price.toFixed(2)}</strong></p>
      <p>${"⭐".repeat(product.rating)}</p>
      <p>${product.description}</p>
      <div class="product_details_actions">
        <button type="button" class="add_to_cart_button" data-product-id="${product.id}">
          Add to Basket
        </button>
        <button type="button" class="product_wishlist_btn product_wishlist_btn--large" data-product-id="${product.id}" aria-pressed="${wishActive ? "true" : "false"}" aria-label="${wishActive ? "Remove from wishlist" : "Save to wishlist"}">
          <i class="fa-heart ${heartClass}" aria-hidden="true"></i>
          <span>Wishlist</span>
        </button>
      </div>
    </section>
  `;

  bindAddToCartButtons();
  bindWishlistButtons();
}

function bindAddToCartButtons() {
  document.querySelectorAll(".add_to_cart_button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      if (productId) {
        addToCart(productId);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initHeaderSearch();
  initCatalogToolbar();
  renderProductGrid();
  renderProductDetails();
  renderCartItems();
  if (typeof renderWishlist === "function") {
    renderWishlist();
  }
});
