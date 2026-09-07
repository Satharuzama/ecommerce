const products = [
  { id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", image: "images/products/athletic-cotton-socks-6-pairs.jpg", name: "Black and Gray Athletic Cotton Socks - 6 Pairs", rating: { stars: 4.5, count: 87 }, priceCents: 1090, keywords: ["socks", "sports", "apparel"] },
  { id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", image: "images/products/intermediate-composite-basketball.jpg", name: "Intermediate Size Basketball", rating: { stars: 4, count: 127 }, priceCents: 2095, keywords: ["sports", "basketballs"] },
  { id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e", image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg", name: "Adults Plain Cotton T-Shirt - 2 Pack", rating: { stars: 4.5, count: 56 }, priceCents: 799, keywords: ["tshirts", "apparel", "mens"] },
  { id: "54e0eccd-8f36-462b-b68a-8182611d9add", image: "images/products/2-slot-toaster-white.jpg", name: "2 Slot Toaster - White", rating: { stars: 5, count: 2197 }, priceCents: 1899, keywords: ["toaster", "kitchen", "appliances"] },
  { id: "3ebe75dc-64d2-4137-8860-1f5a963e534b", image: "images/products/elegant-white-dinner-plate-set.jpg", name: "2 Piece White Dinner Plate Set", rating: { stars: 4, count: 37 }, priceCents: 2067, keywords: ["plates", "kitchen", "dining"] },
  { id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53", image: "images/products/3-piece-cooking-set.jpg", name: "3 Piece Non-Stick, Black Cooking Pot Set", rating: { stars: 4.5, count: 175 }, priceCents: 3499, keywords: ["kitchen", "cookware"] },
];

const deliveryOptions = [
  { id: "1", deliveryDays: 7, priceCents: 0 },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  { id: "3", deliveryDays: 1, priceCents: 999 },
];

const memoryStorage = {};
const storage = typeof localStorage !== "undefined" && typeof localStorage.getItem === "function"
  ? localStorage
  : { getItem: (key) => memoryStorage[key] || null, setItem: (key, value) => { memoryStorage[key] = value; } };

function read(key, fallback) {
  try { return JSON.parse(storage.getItem(key)) || fallback; } catch { return fallback; }
}

function write(key, value) { storage.setItem(key, JSON.stringify(value)); }

function getCartItems() {
  return read("ecommerce-local-cart", [])
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product);
}

export function getProducts(search = "") {
  const query = search.toLowerCase();
  return products.filter((product) => !query || `${product.name} ${product.keywords.join(" ")}`.toLowerCase().includes(query));
}

export function getCart() { return getCartItems(); }

export function addToCart(productId, quantity = 1) {
  const cart = read("ecommerce-local-cart", []);
  const item = cart.find((cartItem) => cartItem.productId === productId);
  if (item) item.quantity += quantity;
  else cart.push({ productId, quantity, deliveryOptionId: "1" });
  write("ecommerce-local-cart", cart);
}

export function updateCartItem(productId, changes) {
  write("ecommerce-local-cart", read("ecommerce-local-cart", []).map((item) => item.productId === productId ? { ...item, ...changes } : item));
}

export function removeFromCart(productId) {
  write("ecommerce-local-cart", read("ecommerce-local-cart", []).filter((item) => item.productId !== productId));
}

export function getDeliveryOptions() {
  return deliveryOptions.map((option) => ({ ...option, estimatedDeliveryTimeMs: Date.now() + option.deliveryDays * 86400000 }));
}

export function getPaymentSummary() {
  const cart = getCartItems();
  const productCostCents = cart.reduce((total, item) => total + item.product.priceCents * item.quantity, 0);
  const shippingCostCents = cart.reduce((total, item) => total + (deliveryOptions.find((option) => option.id === item.deliveryOptionId)?.priceCents || 0), 0);
  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  return { totalItems: cart.reduce((total, item) => total + item.quantity, 0), productCostCents, shippingCostCents, totalCostBeforeTaxCents, taxCents, totalCostCents: totalCostBeforeTaxCents + taxCents };
}

export function createOrder() {
  const cart = getCartItems();
  const totalCostCents = getPaymentSummary().totalCostCents;
  const orderTimeMs = Date.now();
  const order = {
    id: `local-${orderTimeMs}`,
    orderTimeMs,
    totalCostCents,
    products: cart.map((item) => ({
      productId: item.productId,
      product: item.product,
      name: item.product.name,
      quantity: item.quantity,
      estimatedDeliveryTimeMs: orderTimeMs + 7 * 24 * 60 * 60 * 1000,
    })),
  };
  write("ecommerce-local-orders", [order, ...read("ecommerce-local-orders", [])]);
  write("ecommerce-local-cart", []);
  return order;
}

export function getOrders() { return read("ecommerce-local-orders", []); }
export function getOrder(orderId) { return getOrders().find((order) => order.id === orderId); }
