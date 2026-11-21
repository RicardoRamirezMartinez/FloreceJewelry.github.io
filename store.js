
/* ============================================
   FLORECE FINE JEWELRY
   STORE.JS

   10 GOLD PRODUCTS
   10 SILVER PRODUCTS

   HOW TO EDIT A PRODUCT:

   name: Product name
   price: Product price in USD
   image: Your image filename
   category: "gold" or "silver"

   Example:
   {
     name: "14K Gold Earrings",
     price: 150,
     image: "images/gold-1.jpg",
     category: "gold"
   }

   IMPORTANT:
   Keep price: null until you are ready
   to sell the product.
============================================ */


/* ============================================
   GOLD JEWELRY
   EDIT YOUR 10 GOLD PRODUCTS HERE
============================================ */

const PRODUCTS = {

  // GOLD PRODUCT 1
  "earring-1": {
    name: "Earring Style 01",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 2
  "earring-2": {
    name: "Earring Style 02",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 3
  "earring-3": {
    name: "Earring Style 03",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 4
  "earring-4": {
    name: "Earring Style 04",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 5
  "earring-5": {
    name: "Earring Style 05",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 6
  "earring-6": {
    name: "Earring Style 06",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 7
  "earring-7": {
    name: "Earring Style 07",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 8
  "earring-8": {
    name: "Earring Style 08",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 9
  "earring-9": {
    name: "Earring Style 09",
    price: null,
    image: "",
    category: "gold"
  },

  // GOLD PRODUCT 10
  "earring-10": {
    name: "Earring Style 10",
    price: null,
    image: "",
    category: "gold"
  },


  /* ============================================
     SILVER JEWELRY
     EDIT YOUR 10 SILVER PRODUCTS HERE
  ============================================ */

  // SILVER PRODUCT 1
  "silver-1": {
    name: "Silver Jewelry 01",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 2
  "silver-2": {
    name: "Silver Jewelry 02",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 3
  "silver-3": {
    name: "Silver Jewelry 03",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 4
  "silver-4": {
    name: "Silver Jewelry 04",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 5
  "silver-5": {
    name: "Silver Jewelry 05",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 6
  "silver-6": {
    name: "Silver Jewelry 06",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 7
  "silver-7": {
    name: "Silver Jewelry 07",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 8
  "silver-8": {
    name: "Silver Jewelry 08",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 9
  "silver-9": {
    name: "Silver Jewelry 09",
    price: null,
    image: "",
    category: "silver"
  },

  // SILVER PRODUCT 10
  "silver-10": {
    name: "Silver Jewelry 10",
    price: null,
    image: "",
    category: "silver"
  }

};


/* ============================================
   STRIPE CHECKOUT CONFIGURATION

   Add your Cloudflare Worker URL
   when your checkout is ready.
============================================ */

const CHECKOUT_ENDPOINT = "";


/* ============================================
   FORMAT PRICES AS USD
============================================ */

const money = n =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(n);


/* ============================================
   GET SHOPPING BAG
============================================ */

function getCart() {

  try {

    const c = JSON.parse(
      localStorage.getItem("floreceCart") || "{}"
    );

    return c &&
      typeof c === "object" &&
      !Array.isArray(c)
      ? c
      : {};

  } catch {
    return {};
  }

}


/* ============================================
   SAVE SHOPPING BAG
============================================ */

function saveCart(c) {

  localStorage.setItem(
    "floreceCart",
    JSON.stringify(c)
  );

  updateCount();

}


/* ============================================
   UPDATE SHOPPING BAG COUNT
============================================ */

function updateCount() {

  const count = Object.values(getCart()).reduce(
    (sum, n) =>
      sum + (
        Number.isInteger(n) && n > 0 ? n : 0
      ),
    0
  );

  document.querySelectorAll(".cart-count")
    .forEach(el => el.textContent = count);

}


/* ============================================
   CHECK IF PRODUCT HAS VALID PRICE
============================================ */

function validProduct(id) {

  const p = PRODUCTS[id];

  return p &&
    Number.isFinite(p.price) &&
    p.price > 0;

}


/* ============================================
   ADD PRODUCT TO SHOPPING BAG
============================================ */

function addToCart(id) {

  if (!validProduct(id)) return;

  const c = getCart();

  c[id] = Math.min(
    10,
    (Number.isInteger(c[id]) ? c[id] : 0) + 1
  );

  saveCart(c);

  alert("Added to your shopping bag!");

}


/* ============================================
   DISPLAY PRODUCTS ON GOLD AND SILVER PAGES
============================================ */

function renderProducts() {

  const list = document.getElementById(
    "product-list"
  );

  if (!list) return;

  // Clear existing products
  list.replaceChildren();

  // Show only products matching the page
  Object.entries(PRODUCTS)
    .filter(([id, p]) =>
      p.category === list.dataset.category
    )
    .forEach(([id, p]) => {

      // Product card
      const card = document.createElement("article");
      card.className = "product";

      // Product photo
      const photo = document.createElement("div");
      photo.className = "photo";

      if (p.image) {

        const img = document.createElement("img");

        img.src = p.image;
        img.alt = p.name;

        img.onerror = () => {
          photo.replaceChildren(
            document.createTextNode(
              "Add your product photo"
            )
          );
        };

        photo.append(img);

      } else {

        photo.textContent = "Add your product photo";

      }

      // Product name
      const title = document.createElement("h2");
      title.textContent = p.name;

      // Product price
      const price = document.createElement("p");
      price.className = "price";

      price.textContent = validProduct(id)
        ? money(p.price)
        : "Price coming soon";

      // Add to Bag button
      const btn = document.createElement("button");
      btn.className = "button";

      btn.textContent = validProduct(id)
        ? "Add to Bag"
        : "Not Yet Available";

      btn.disabled = !validProduct(id);

      btn.addEventListener("click", () =>
        addToCart(id)
      );

      // Add elements to product card
      card.append(photo, title, price, btn);

      // Add product card to page
      list.append(card);

    });

}


/* ============================================
   DISPLAY SHOPPING BAG
============================================ */

function renderCart() {

  const el = document.getElementById("cart-items");

  if (!el) return;

  el.replaceChildren();

  const cart = getCart();

  let total = 0;
  let validCount = 0;

  Object.entries(cart).forEach(([id, q]) => {

    if (
      !validProduct(id) ||
      !Number.isInteger(q) ||
      q < 1 ||
      q > 10
    ) return;

    validCount++;

    const p = PRODUCTS[id];

    total += p.price * q;

    const row = document.createElement("div");
    row.className = "cart-item";

    // Product details
    const details = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = p.name;

    const price = document.createElement("p");
    price.textContent = money(p.price) + " each";

    details.append(title, price);

    // Quantity controls
    const qty = document.createElement("div");
    qty.className = "qty";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.setAttribute(
      "aria-label",
      "Decrease " + p.name
    );

    const count = document.createElement("span");
    count.textContent = q;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.disabled = q >= 10;
    plus.setAttribute(
      "aria-label",
      "Increase " + p.name
    );

    minus.onclick = () => changeQty(id, -1);
    plus.onclick = () => changeQty(id, 1);

    qty.append(minus, count, plus);

    // Remove button
    const remove = document.createElement("button");
    remove.className = "remove";
    remove.textContent = "Remove";

    remove.onclick = () => {

      const c = getCart();

      delete c[id];

      saveCart(c);
      renderCart();

    };

    row.append(details, qty, remove);
    el.append(row);

  });

  if (!validCount) {
    el.textContent = "Your shopping bag is empty.";
  }

  document.getElementById("cart-total").textContent =
    money(total);

  document.getElementById("checkout-button").disabled =
    !validCount;

}


/* ============================================
   CHANGE PRODUCT QUANTITY
============================================ */

function changeQty(id, delta) {

  const c = getCart();

  const next = (c[id] || 0) + delta;

  if (next <= 0) {

    delete c[id];

  } else {

    c[id] = Math.min(10, next);

  }

  saveCart(c);
  renderCart();

}


/* ============================================
   START STRIPE CHECKOUT
============================================ */

async function startCheckout() {

  const msg = document.getElementById(
    "checkout-message"
  );

  const btn = document.getElementById(
    "checkout-button"
  );

  const cart = Object.fromEntries(
    Object.entries(getCart()).filter(([id, q]) =>
      validProduct(id) &&
      Number.isInteger(q) &&
      q >= 1 &&
      q <= 10
    )
  );

  if (!Object.keys(cart).length) {

    msg.textContent = "Your bag is empty.";
    return;

  }

  if (!CHECKOUT_ENDPOINT) {

    msg.textContent =
      "Checkout is not connected yet. " +
      "Please configure Stripe and the Cloudflare Worker.";

    return;

  }

  btn.disabled = true;
  msg.textContent = "Opening secure checkout…";

  try {

    const r = await fetch(CHECKOUT_ENDPOINT, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        items: cart
      })

    });

    const data = await r.json();

    if (
      !r.ok ||
      !data.url ||
      !data.url.startsWith(
        "https://checkout.stripe.com/"
      )
    ) {

      throw Error(
        data.error || "Checkout is unavailable."
      );

    }

    location.assign(data.url);

  } catch (e) {

    msg.textContent = e.message;
    btn.disabled = false;

  }

}


/* ============================================
   WEBSITE INITIALIZATION
============================================ */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    // Update shopping bag counter
    updateCount();

    // Display Gold or Silver products
    renderProducts();

    // Display shopping bag
    renderCart();

    // Connect checkout button
    document.getElementById("checkout-button")
      ?.addEventListener("click", startCheckout);

    // Stripe return message
    if (
      new URLSearchParams(location.search)
        .has("session_id")
    ) {

      const msg = document.getElementById(
        "checkout-message"
      );

      if (msg) {

        msg.textContent =
          "Returned from Stripe. " +
          "Check your confirmation email for payment status; " +
          "do not treat this page alone as proof of payment.";

      }

    }

  }
);
