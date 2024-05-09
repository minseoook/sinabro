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

async function main() {
  const products = await getProducts();

  document.querySelector("#products").innerHTML = products
    .map(
      (product) => `
      <div class="product" >
      <img src="${product.images[0]}" alt="Image of ${product.name}" />
      <p>${product.name}</p>
      <div class="flex items-center justify-between">
        <span>Price: ${product.regularPrice}</span>
        <div>
          <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
          <span class="cart-count text-green-800">${0}</span>
          <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
        </div>
      </div>
    </div>`
    )
    .join("");
}

main();
