const cart = [];

function addToCart(name, price) {
  const item = cart.find(x => x.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

function removeFromCart(name) {
  const index = cart.findIndex(x => x.name === name);

  if (index !== -1) {
    cart[index].qty--;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }

  updateCart();
}

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const countElement = document.getElementById("cart-count");
  const totalElement = document.getElementById("cart-total");
  const itemsElement = document.getElementById("cart-items");

  if (countElement) countElement.textContent = count;
  if (totalElement) totalElement.textContent =
    total.toLocaleString("ar-IQ") + " د.ع";

  if (itemsElement) {
    if (cart.length === 0) {
      itemsElement.innerHTML = "<p>السلة فارغة</p>";
      return;
    }

    itemsElement.innerHTML = cart.map(item => `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <span>${item.price.toLocaleString("ar-IQ")} د.ع × ${item.qty}</span>
        <button onclick="removeFromCart('${item.name}')">−</button>
        <button onclick="addToCart('${item.name}', ${item.price})">+</button>
      </div>
    `).join("");
  }
}

function sendOrder() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  const order = cart.map(item =>
    `${item.name} × ${item.qty} = ${(item.price * item.qty).toLocaleString("ar-IQ")} د.ع`
  ).join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const message =
    `السلام عليكم، أريد طلب من فلاح ستور\n\n` +
    `${order}\n\n` +
    `المجموع: ${total.toLocaleString("ar-IQ")} د.ع`;

  window.open(
    "https://wa.me/9647803734579?text=" + encodeURIComponent(message),
    "_blank"
  );
}
