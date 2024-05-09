import test from "./test.json?raw";

async function getProducts() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(test);
  } else {
    const res = await fetch(
      "https://learnwitheunjae.dev/api/sinabro-js/ecommerce"
    );
    const products = await res.json();
    return products;
  }
}

function findElement(startElement, endElement) {
  let currentElement = startElement;
  while (currentElement) {
    if (currentElement.matches(endElement)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}
function sumAllCounts(countMap) {
  const hap = Object.values(countMap).reduce((acc, key) => acc + key, 0);
  return hap;
}

function getProductHtml(product, count = 0) {
  return `
  <div class="product" data-product-id="${product.id}">
    <img src="${product.images[0]}" alt="Image of ${product.name}" />
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
        <span class="cart-count text-green-800">${
          count === 0 ? "" : count
        }</span>
        <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
      </div>
    </div>
  </div>
`;
}

async function main() {
  const products = await getProducts();
  const countMap = {};
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  const updateProductCount = (productId) => {
    const productElement = document.querySelector(
      `.product[data-product-id='${productId}']`
    );
    const cartCountElement = productElement.querySelector(".cart-count");
    cartCountElement.innerHTML = countMap[productId];
    if (countMap[productId] === 0) {
      cartCountElement.innerHTML = "";
    }
  };

  const updateCart = () => {
    const productIds = Object.keys(countMap);
    document.querySelector(".cart_items").innerHTML = productIds
      .map((id) => {
        const prodcutInCart = productMap[id];
        if (countMap[id] === 0) {
          return "";
        }
        return getProductHtml(prodcutInCart, countMap[id]);
      })
      .join("");
    document.querySelector(".total_count").innerHTML = `(${sumAllCounts(
      countMap
    )})`;
  };
  const increaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    updateProductCount(productId);
    updateCart();
  };

  const decreaseCount = (productId) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    updateProductCount(productId);
    updateCart();
  };

  document.querySelector("#products").innerHTML = products
    .map((product) => getProductHtml(product))
    .join("");

  document.querySelector("#products").addEventListener("click", (e) => {
    const targetElement = e.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");

    if (targetElement.matches(".btn-increase")) {
      increaseCount(productId);
    } else if (targetElement.matches(".btn-decrease")) {
      decreaseCount(productId);
    }
  });
  document.querySelector(".cart_items").addEventListener("click", (e) => {
    const targetElement = e.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");

    if (targetElement.matches(".btn-increase")) {
      increaseCount(productId);
    } else if (targetElement.matches(".btn-decrease")) {
      decreaseCount(productId);
    }
  });

  document.querySelector(".btn-cart").addEventListener("click", () => {
    document.body.classList.add("displaying_cart");
  });

  document.querySelector(".btn-close-cart").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });

  document.querySelector(".cart-dimmed-bg").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });
}

main();
