const menuContainer = document.getElementById("menu-items");
const sendOrderButton = document.getElementById("send-order");
const nubmerOfOrder = document.getElementById("nubmerOfOrder");

let selectedProducts = [];

fetch("data.json")
  .then((response) => response.json())
  .then((products) => {
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "menu-item";

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price} شيكل</p>
        <button onclick="addToOrder(${product.id}, '${product.name}', ${product.price})">
          أضف إلى الطلب
        </button>
      `;

      menuContainer.appendChild(productDiv);
    });
  });

function addToOrder(id, name, price) {
  if (!selectedProducts.some((product) => product.id === id)) {
    selectedProducts.push({ id, name, price });
    console.log(selectedProducts)
    nubmerOfOrder.style.display = "block";
    nubmerOfOrder.innerText=selectedProducts.length;
  }
}

sendOrderButton.addEventListener("click", () => {
  if (selectedProducts.length === 0) {
    alert("لم تقم بإضافة أي منتجات إلى الطلب");
    return;
  }

  const orderDetails = selectedProducts
    .map((product) => `${product.name} - ${product.price} شيكل`)
    .join("\n");

  const whatsappMessage = `مرحبا، أود طلب التالي:\n\n${orderDetails}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/+970568096370?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
});
