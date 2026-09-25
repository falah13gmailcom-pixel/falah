window.cart = [];

window.addToCart = function(name, price) {
  const item = window.cart.find(x => x.name === name);

  if (item) {
    item.qty++;
  } else {
    window.cart.push({ name, price, qty: 1 });
  }

  window.updateCart();
  window.toggleCart();
};

window.removeFromCart = function(name) {
  const index = window.cart.findIndex(x => x.name === name);

  if (index !== -1) {
    window.cart[index].qty--;

    if (window.cart[index].qty <= 0) {
      window.cart.splice(index, 1);
    }
  }

  window.updateCart();
};

window.updateCart = function() {
  const count = window.cart.reduce((sum, item) => sum + item.qty, 0);
  const total = window.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const countElement = document.getElementById("cart-count");
  const totalElement = document.getElementById("cart-total");
  const itemsElement = document.getElementById("cart-items");

  if (countElement) {
    countElement.textContent = count;
  }

  if (totalElement) {
    totalElement.textContent =
      total.toLocaleString("ar-IQ") + " د.ع";
  }

  if (itemsElement) {
    if (window.cart.length === 0) {
      itemsElement.innerHTML = "<p>السلة فارغة</p>";
      return;
    }

    itemsElement.innerHTML = window.cart.map(item => `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <span>${item.price.toLocaleString("ar-IQ")} د.ع × ${item.qty}</span>
        <button onclick="removeFromCart('${item.name}')">−</button>
        <button onclick="addToCart('${item.name}', ${item.price})">+</button>
      </div>
    `).join("");
  }
};

window.sendOrder = function() {
  if (window.cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  const order = window.cart.map(item =>
    `${item.name} × ${item.qty} = ${(item.price * item.qty).toLocaleString("ar-IQ")} د.ع`
  ).join("\n");

  const total = window.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const message =
    `السلام عليكم، أريد طلب من فلاح ستور\n\n` +
    `${order}\n\n` +
    `المجموع: ${total.toLocaleString("ar-IQ")} د.ع`;

  window.open(
    "https://wa.me/9647803734579?text=" +
    encodeURIComponent(message),
    "_blank"
  );
};

window.updateCart();
